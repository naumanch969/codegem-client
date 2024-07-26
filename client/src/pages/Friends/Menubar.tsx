import React from 'react';
import { useNavigate } from 'react-router-dom';

const Menubar = ({ activeMenuItem, setActiveMenuItem }: { activeMenuItem: any, setActiveMenuItem: any }) => {
    const menuItems = [
        'Find',
        'Friends',
        'Suggested',
        'Received',
        'Sent',
    ];
    const navigate = useNavigate()

    return (
        <div className="flex justify-center ">
            <div className="bg-white shadow-md rounded-lg flex overflow-hidden">
                {menuItems.map(item => (
                    <button
                        key={item}
                        className={`py-2 px-4 ${activeMenuItem.toLowerCase() === item.toLowerCase()
                            ? 'bg-copper text-white'
                            : 'text-cool-gray'
                            } hover:bg-copper-lighten hover:text-white transition-all duration-200 focus:outline-none`}
                        onClick={() => {
                            navigate(`/users/${item.toLowerCase()}`)
                            setActiveMenuItem(item.toLowerCase())
                        }}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Menubar;
