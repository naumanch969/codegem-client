import React, { useState } from 'react';

const ProfileMenuBar = ({ activeMenuItem, setActiveMenuItem }: { activeMenuItem: string, setActiveMenuItem: any }) => {
    const menuItems = ['About', 'Codes', 'Saved', 'Collections', 'Groups'];

    return (
        <div className="flex justify-center mb-6">
            <div className="bg-white shadow-md rounded-lg flex overflow-hidden">
                {menuItems.map(item => (
                    <button
                        key={item}
                        className={`py-2 px-4 ${activeMenuItem.toLowerCase() === item.toLowerCase() ? 'bg-teal-blue text-white' : 'text-gray-700'
                            } hover:bg-teal-blue-lighten hover:text-white transition-all duration-200 focus:outline-none`}
                        onClick={() => setActiveMenuItem(item.toLocaleLowerCase())}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProfileMenuBar;
