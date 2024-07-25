/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '@/components/ui/card';
import { User } from '@/interfaces';
import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

const Menubar = ({ menuItems }: { menuItems: { label: string, value: string, onClick: any }[] }) => {
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user);

    return (
        <Card className="flex flex-col justify-start items-start gap-2 p-2 w-full h-fit sticky top-20 shadow-lg ">
            <h3 className="text-2xl text-dark-slate-blue font-medium px-2 ">
                {loggedUser?.firstName} {loggedUser?.lastName}
            </h3>

            <div className="bg-white rounded-md flex flex-col gap-1 overflow-hidden w-full h-fit ">
                {menuItems?.map((item, index) => (
                    <span
                        key={index}
                        onClick={() => item.onClick()}
                        className={`cursor-pointer rounded text-start py-3 px-2 text-cool-gray hover:bg-warm-gray-light hover:text-white transition-all duration-200 focus:outline-none
                             ${false ? 'bg-warm-gray-light text-white' : ''
                            }`}
                    >
                        {item.label}
                    </span>
                ))}
            </div>
        </Card>
    );
};

export default Menubar;
