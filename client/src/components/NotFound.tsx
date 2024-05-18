import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {

    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-lighter-gray">
            <div className="max-w-md w-full space-y-8 p-10 rounded-xl shadow-box">
                <div>
                    <h1 className="mx-auto text-9xl font-bold text-main-blue">
                        Oops!
                    </h1>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-main-blue">
                        404 - Page Not Found
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sorry, the page you are looking for does not exist.
                    </p>
                </div>
                <div className="flex justify-center" >
                    <Button onClick={() => navigate('/')} >
                        Go back home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;