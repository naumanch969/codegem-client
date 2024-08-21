import React from 'react';
import { Pagination as PaginationContainer, PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';

export const Pagination = ({ maxLength, page, setPage }: { maxLength: number, page: number, setPage: (page: number) => void }) => {
    const totalPages = Math.ceil(maxLength / 10);

    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const renderPaginationItems = () => {
        const pageNumbers = getPageNumbers();

        return pageNumbers.map((pageNumber, index) => {
            if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= page - 2 && pageNumber <= page + 2)) {
                return (
                    <PaginationItem key={index}>
                        <PaginationLink href="#" isActive={pageNumber === page} onClick={() => setPage(pageNumber)}>
                            {pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                );
            } else if (pageNumber === page - 3 || pageNumber === page + 3) {
                return (
                    <PaginationItem key={index}>
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
            return null;
        });
    };

    return (
        <PaginationContainer>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => setPage(page - 1)} />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                    <PaginationNext href="#" onClick={() => setPage(page + 1)} />
                </PaginationItem>
            </PaginationContent>
        </PaginationContainer>
    );
};