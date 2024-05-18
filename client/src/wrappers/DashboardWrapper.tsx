import React, { ReactNode } from 'react';
import { DashboardNavbar, Sidebar } from '@/components'
import { useStateContext } from '@/contexts/ContextProvider';
import { Outlet } from 'react-router-dom';

const LandingPageWrapper: React.FC = () => {
    const { showSidebar } = useStateContext();

    return (
        <div className="w-full h-screen overflow-y-scroll overflow-x-hidden flex flex-col">
            <div className="sticky left-0 top-0 z-50 w-full bg-dark-slate-blue   text-white">
                <DashboardNavbar />
            </div>
            <div className="md:w-screen flex justify-between ">
                <div
                    style={{ height: "calc(100vh - 4rem)" }}
                    className={`${showSidebar ? "lg:w-[20%] md:w-[25%]" : "lg:w-[5%] md:w-[6%]"} bg-dark-slate-blue text-white sticky top-[4rem] transition-all border-r-[2px] border-gray-100`}
                >
                    <Sidebar />
                </div>

                <div className={`flex bg-white text-cool-gray ${showSidebar ? "lg:w-[80%] md:w-[75%]" : "lg:w-[95%] md:w-[94%]"}  `}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default LandingPageWrapper