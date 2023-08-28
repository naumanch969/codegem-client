import React from 'react';

const Menubar = ({ activeMenuItem, setActiveMenuItem }) => {
    const menuItems = [
        'Friends',
        'Suggested',
        'Friend Requests',
        'Sent Requests',
        'More',
    ];

    return (
        <div className="flex justify-center ">
            <div className="bg-white shadow-md rounded-lg flex overflow-hidden">
                {menuItems.map(item => (
                    <button
                        key={item}
                        className={`py-2 px-4 ${activeMenuItem.toLowerCase() === item.toLowerCase()
                            ? 'bg-teal-blue text-white'
                            : 'text-cool-gray'
                            } hover:bg-teal-blue-lighten hover:text-white transition-all duration-200 focus:outline-none`}
                        onClick={() => setActiveMenuItem(item.toLowerCase())}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Menubar;
