import React from 'react';
import { Link } from 'react-router-dom';

const Path = ({ segments }) => {
  return (
    <div className="flex items-center space-x-2 text-gray-500">
      {segments?.map((segment, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span>{'>'}</span>} {/* Add a separator between segments */}
          <Link to={segment.link} className="hover:text-teal-500">
            {segment.name}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Path;