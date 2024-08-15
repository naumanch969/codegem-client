import React, { ReactNode } from 'react';
import { DashboardNavbar, Sidebar } from '@/components'
import { useStateContext } from '@/contexts/ContextProvider';
import { Outlet } from 'react-router-dom';

const LandingPageWrapper: React.FC = () => {
    const { showSidebar } = useStateContext();

    return (
        <div className="w-full h-screen overflow-y-auto overflow-x-hidden flex ">
            <div className={`${showSidebar ? "lg:w-[20%] md:w-[25%]" : "lg:w-[5%] md:w-[6%]"} h-screen bg-blackish text-white sticky top-0 transition-all border-r-[2px] border-gray-100`} >
                <Sidebar />
            </div>
            <div className={`${showSidebar ? "lg:w-[80%] md:w-[75%]" : "lg:w-[95%] md:w-[94%]"} flex flex-col justify-start `}>
                <div className="sticky left-0 top-0 z-50 w-full bg-blackish-lighten text-white">
                    <DashboardNavbar />
                </div>

                <div className={`flex bg-white text-cool-gray w-full h-full `}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default LandingPageWrapper