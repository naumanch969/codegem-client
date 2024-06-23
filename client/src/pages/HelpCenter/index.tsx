import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HelpCenter = () => {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-lighter-gray">

      <h2 className="text-4xl font-bold text-main-blue text-center w-full">Help Center</h2>

      <div className="max-w-md w-full space-y-8 p-10 rounded-xl shadow-box">
        <div>
          <h1 className="mx-auto text-7xl font-bold text-main-blue text-center">
            Oops!
          </h1>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-main-blue">
            Page Under Construction
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We apologize for the inconvenience. This page is currently under construction and will be available soon.
          </p>
        </div>
        <div className="flex justify-center">
          <Button onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HelpCenter