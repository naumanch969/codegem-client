import { Card } from '@/components/ui/card';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Menubar = ({ activeMenuItem, setActiveMenuItem }: { activeMenuItem: any, setActiveMenuItem: any }) => {
    const menuItems = [
        { label: 'All Users', value: 'find' },
        { label: 'Your Friends', value: 'friends' },
        { label: 'Suggested to you', value: 'suggested' },
        { label: 'Friend Requests', value: 'received' },
        { label: 'Sent Requests', value: 'sent' },
    ];
    const navigate = useNavigate()

    return (
        <Card className="flex flex-col justify-start items-start gap-2 p-2 w-full h-fit sticky top-20 shadow-lg ">

            <div className="bg-white rounded-md flex flex-col gap-1 overflow-hidden w-full h-fit ">
                {menuItems?.map((item, index) => (
                    <span
                        key={index}
                        className={`cursor-pointer rounded text-start py-3 px-2 text-black hover:bg-blackish-lighten  hover:text-white transition-all duration-200 focus:outline-none
                         ${activeMenuItem === item.value ? 'bg-blackish-lighten text-white' : 'text-black'
                            }`}
                        onClick={() => {
                            navigate(`/users/${item.value}`)
                            setActiveMenuItem(item.value)
                        }}
                    >
                        {item.label}
                    </span>
                ))}
            </div>
        </Card>
    );
};

export default Menubar;
