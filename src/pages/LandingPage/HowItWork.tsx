import React from 'react'
import { SVG } from '@/components'
import { personalize, signup, app_progress } from '@/assets/svgs'

const HowItWork = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
    const CircularNumber = ({ num }: { num: number }) => {
        return (<span className='text-white p-2 rounded-full border border-white w-4 h-4 flex justify-center items-center' >{num}</span>)
    }

    return (
        <div className="min-h-screen flex flex-col justify-start items-center py-32 ">
            <div className="flex flex-col justify-center items-center w-full h-fit  ">
                <h2 className="text-5xl font-bold text-foreground text-blackish-lighten">Get Started with Codegem in 3 Easy Steps</h2>
                <span className=' px-32 mt-6 text-center ' >Follow these simple steps to seamlessly translate your ASL gestures into clear and concise audio.</span>
            </div>
            <div className="flex justify-center gap-12 mt-20 w-full ">

                <div className="bg-primary/5 rounded-md p-4 flex flex-col justify-center items-center gap-4 w-80 relative">
                    <SVG width='14rem' height='18rem' svg={signup} />
                    <div className="flex flex-col items-center gap-1.5 ">
                        <h1 className="font-bold text-2xl ">Register Your Account</h1>
                        <p className="text-base text-center">Sign up with your email or social media to join the Codegem community.</p>
                        <div className='h-10 px-4 py-2 rounded-md inline-flex items-center bg-blackish text-white mt-4 space-x-2 ' ><CircularNumber num={1} /> <span>Register</span></div>
                    </div>
                </div>
                <div className="bg-primary/5 rounded-md p-4 flex flex-col justify-center items-center gap-4 w-80 relative">
                    <SVG width='14rem' height='18rem' svg={personalize} />
                    <div className="flex flex-col items-center gap-1.5 ">
                        <h1 className="font-bold text-2xl ">Customize Your Profile</h1>
                        <p className="text-base text-center">Personalize your profile by adding your skills, interests, and achievements.</p>
                        <div className='h-10 px-4 py-2 rounded-md inline-flex items-center bg-blackish text-white mt-4 space-x-2 ' ><CircularNumber num={2} /> <span>Customize</span></div>
                    </div>
                </div>
                <div className="bg-primary/5 rounded-md p-4 flex flex-col justify-center items-center gap-4 w-80 relative">
                    <SVG width='14rem' height='18rem' svg={app_progress} />
                    <div className="flex flex-col items-center gap-1.5 ">
                        <h1 className="font-bold text-2xl ">Start the Magic</h1>
                        <p className="text-base text-center">Share code snippets, track progress, and connect with others!.</p>
                        <div className='h-10 px-4 py-2 rounded-md inline-flex items-center bg-blackish text-white mt-4 space-x-2 ' ><CircularNumber num={3} /> <span>Let It</span></div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HowItWork