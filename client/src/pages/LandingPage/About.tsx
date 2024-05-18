import React from 'react'
import { About1, About2, About3 } from '@/assets'

const About = () => {
    return (
        <div className="min-h-screen flex flex-col justify-start items-center py-12 pb-32 ">

            <h2 className="text-5xl font-bold text-foreground ">About Codegem</h2>
            <h4 className='text-xl text-accent-foreground mt-2 ' >Empowering Communication, One Gesture at a Time</h4>

            <span className=' px-32 mt-8 text-center ' >At EchoSign, we are driven by a singular mission: to empower individuals with special needs through innovative technology. We believe that effective communication is a fundamental right for all, and we're committed to breaking down barriers to ensure that everyone can express themselves freely.</span>

            <div className="flex flex-col justify-start items-start gap-32 mt-28 px-12">
                <div className="grid grid-cols-2 gap-6 w-full ">
                    <div className="cols-span-1 flex flex-col gap-4 ">
                        <h3 className='text-foreground text-3xl font-semibold ' >Innovative Technology,
                            <br />Inclusive Solutions</h3>
                        <span className="text-muted-foreground mt-2 ">EchoSign harnesses the power of advanced technology to bridge communication gaps for individuals who use sign language as their primary mode of communication. Our platform utilizes state-of-the-art gesture recognition technology, powered by MediaPipe, to accurately translate American Sign Language (ASL) gestures into sound. By converting ASL into sound, we make communication accessible to everyone, regardless of their hearing abilities.</span>
                    </div>
                    <div className="cols-span-1 flex justify-center ">
                        <img src={About2} alt='' className='w-[22rem] ' />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 w-full ">
                    <div className="cols-span-1 flex justify-center ">
                        <img src={About1} alt='' className='w-[22rem] ' />
                    </div>
                    <div className="cols-span-1 flex flex-col gap-4 ">
                        <h3 className='text-foreground text-3xl font-semibold ' >Seamless Interaction,
                            <br />Effortless Communication</h3>
                        <span className="text-muted-foreground mt-2 ">Whether it's expressing basic needs, sharing emotions, or engaging in everyday conversations, EchoSign is designed to facilitate seamless interaction. Our user-friendly interface ensures effortless communication, allowing users to convey their messages with clarity and ease. With support for a wide range of ASL gestures, including alphabets, digits, and common gestures, EchoSign empowers individuals to communicate effectively in any situation.</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 w-full ">
                    <div className="cols-span-1 flex flex-col gap-4 ">
                        <h3 className='text-foreground text-3xl font-semibold ' >Promoting Inclusivity,
                            <br />Fostering Empowerment</h3>
                        <span className="text-muted-foreground mt-2 ">At EchoSign, we are committed to promoting inclusivity and fostering empowerment within our community. We believe that everyone deserves to be heard, and we're dedicated to creating a world where communication barriers are a thing of the past. By providing accessible solutions and championing the rights of individuals with special needs, we're paving the way for a more inclusive and equitable society.</span>
                    </div>
                    <div className="cols-span-1 flex justify-center ">
                        <img src={About3} alt='' className='w-[26rem] ' />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About