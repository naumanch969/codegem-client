import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { notFound } from '@/assets';

const InProgress = () => {

    const navigate = useNavigate()

    return (
        <div className="pt-20 pb-4 flex items-center justify-center bg-lighter-gray relative">
            <div className="max-w-md w-full space-y-8 p-10 rounded-xl shadow-box">
                <div>
                    <img src={notFound} alt='Feature Under Development' className='w-full h-full' />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-main-blue">
                        Coming Soon!
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        This feature is currently under development. We appreciate your patience and understanding.
                    </p>
                </div>
                <div className="flex justify-center">
                    <Button onClick={() => navigate('/')}>
                        Go Back Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InProgress;