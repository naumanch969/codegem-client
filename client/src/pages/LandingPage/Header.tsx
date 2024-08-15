import React from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { Tooltip } from '@mui/material'
import { header } from '@/assets/svgs';
import { SvgIcon } from '@/components'

const Header = () => {

    const navigate = useNavigate()
    const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')!) : null

    return (
        <div className='ml-8 mt-14 text-center h-[30rem] grid grid-cols-2 gap-4 mb-40 '>
            <div className='flex flex-col justify-center itmes-start w-full col-span-1'>
                <h1 className="pb-3 text-blackish-lighten text-7xl text-foreground font-bold mb-8 text-start">Code, Collaborate, Connect</h1>
                <p className=" text-gray-700 text-lg text-start">Discover a dedicated space for programmers on Codegem. Share your code, collaborate on exciting projects, and connect with like-minded individuals</p>
                <div className="relative flex justify-start gap-2 w-full ">
                    <Button onClick={() => profile ? navigate('/home') : navigate('/auth/login')} size='lg' className="text-lg py-7 px-8 mt-8" >Get Started</Button>
                    <Button onClick={() => navigate('/about')} variant='outline' size='lg' className="text-lg py-7 px-8 mt-8" >Learn more</Button>
                    <Tooltip title='Chat' placement='top' >
                        <Button onClick={() => navigate('/chat')} className='fixed bottom-4 right-4 rounded-full w-12 h-12 flex justify-center items-center '>
                            <MessageCircle className='w-6 h-6' />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className='flex justify-center items-center w-full col-span-1 gap-4'>
                <SvgIcon
                    width='100%'
                    svgContent={header}
                    colors={{
                        '#3f3d58': '#8C5E28',   // Copper
                        '#6c63ff': '#B87333',   // Copper-Dark
                        '#3f3d56': '#2C2C2C'    // Blackish
                    }}
                />
            </div>
        </div>
    )
}

export default Header