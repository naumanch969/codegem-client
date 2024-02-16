import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface InfiniteScrollProps {
  children: ReactNode;
  hasMore: boolean;
  loader: ReactNode;
  next: () => void;
  dataLength: number;
  parentRef: React.RefObject<HTMLElement>; // Ref for the parent element
  threshold?: number;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  hasMore,
  loader,
  next,
  dataLength,
  parentRef,
  threshold = 200,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const bottomBoundaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!parentRef.current || !bottomBoundaryRef.current) return;

    const options = {
      root: parentRef.current,
      rootMargin: '0px',
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !isFetching) {
        setIsFetching(true);
      }
    }, options);

    observer.current.observe(bottomBoundaryRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasMore, isFetching, parentRef]);

  useEffect(() => {
    if (isFetching) {
      next();
      setIsFetching(false);
    }
  }, [isFetching, next]);

  return (
    <div>
      {children}
      <div ref={bottomBoundaryRef} style={{ height: `${threshold}px` }}>
        {isFetching && loader}
      </div>
    </div>
  );
};

export default InfiniteScroll;
