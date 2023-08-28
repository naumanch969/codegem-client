import React from 'react';
import { PeopleAlt, Update, PersonAdd } from '@mui/icons-material';

const RightSidebar = () => {
    return (
        <div className="bg-white p-4 shadow-md rounded-lg w-full ">
            {/* Suggested to You */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2 text-dark-slate-blue">
                    Suggested to You
                </h2>
                {/* Add suggested users here */}
            </div>

            {/* Latest Activities */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2 text-dark-slate-blue">
                    Latest Activities
                </h2>
                {/* Add latest activities here */}
            </div>

            {/* Your Friends */}
            <div>
                <h2 className="text-lg font-semibold mb-2 text-dark-slate-blue">
                    Your Friends
                </h2>
                {/* Add your friends here */}
            </div>
        </div>
    );
};

export default RightSidebar;
