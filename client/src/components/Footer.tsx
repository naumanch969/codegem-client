import React, { useState } from 'react'
import { logo } from '@/assets'
import { Button } from './ui/button'
import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'


const Footer = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    const dispatch = useDispatch()

    ///////////////////////////////////////////////////////// STATE ///////////////////////////////////////////////////////////
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
    const onSubscribe = () => {
        if (!email) return toast.error('Email is required.')

        // setLoading(true)
        // dispatch<any>(subscribe(email))
        //     .finally(() => {
        //         setEmail('')
        //         setLoading(false)
        //     })
    }

    return (
        <div className='flex flex-col gap-24 border-t mt-28 pt-16 ' >
            <div className="grid grid-cols-2 gap-36 w-full ">
                <div className="col-span-1 w-full flex flex-col gap-4">
                    <Link to='/' ><img src={logo} alt="Image" className="w-48 z-10" /></Link>
                    <h1>Discover a dedicated space for programmers on Codegem. Share your code, collaborate on exciting projects, and connect with like-minded individuals.</h1>
                </div>
                <div className="col-span-1 flex flex-col gap-10 w-full">

                    <div className="flex flex-col justify-between gap-4">
                        <h3 className='text-xl text-foreground font-semibold ' >Social links</h3>
                        <div className="flex justify-start items-center gap-4 w-full ">
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link to='https://github.com' target='new' ><Github className=' ' /></Link>
                                </TooltipTrigger>
                                <TooltipContent>Github</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link to='https://linkedin.com' target='new' ><Linkedin className=' ' /></Link>
                                </TooltipTrigger>
                                <TooltipContent>Linkedin</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link to='https://twitter.com' target='new' ><Twitter className=' ' /></Link>
                                </TooltipTrigger>
                                <TooltipContent>Twitter</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link to='https://instagram.com' target='new' ><Instagram className=' ' /></Link>
                                </TooltipTrigger>
                                <TooltipContent>Instagram</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link to='https://mail.google.com/' target='new' ><Mail className=' ' /></Link>
                                </TooltipTrigger>
                                <TooltipContent>Mail</TooltipContent>
                            </Tooltip>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className='text-xl text-foreground font-semibold ' >Subscribe to our newsletter</h3>
                        <div className="flex justify-between items-center gap-2 pr-1 ">
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your email'
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Button onClick={onSubscribe} disabled={loading} >{loading ? 'Processing...' : 'Subscribe'}</Button>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex flex-col justify-center items-center gap-2 ">
                <div className="flex justify-center gap-4 text-black text-sm font-bold">
                    <Link to='/HowItWork' className='hover:text-green hover:underline cursor-pointer'>Help</Link>
                    <Link to='/' className='hover:text-green hover:underline cursor-pointer'>FAQs</Link>
                    <Link to='/about' className='hover:text-green hover:underline cursor-pointer'>About Us</Link>
                    <Link to='/contact' className='hover:text-green hover:underline cursor-pointer'>Contact Us</Link>
                    <Link to='/PrivacyPolicy' className='hover:text-green hover:underline cursor-pointer'>Privacy Policy </Link>
                    <Link to='/terms-and-conditions' className='hover:text-green hover:underline cursor-pointer'>Terms and Conditions </Link>
                </div>
                <div className='flex justify-center items-center h-fit w-full mt-4'>
                    Copyright &copy; 2024 Echosign
                </div>

            </div>

        </div>


    )
}

export default Footer
