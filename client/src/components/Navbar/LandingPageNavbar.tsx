import React from 'react'
import { logo } from '@/assets'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const LandingPageNavbar = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loggedUser } = useSelector((state: RootState) => state.user)

    ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
    const onLogout = () => {
        navigate('/')
        Cookies.remove('echo.token')
        toast.success('Logout successfully.')
    }


    return (
        <div className="flex justify-between items-center h-[6rem] w-full ">

            <Link to='/' ><img src={logo} alt="Image" className="w-48 z-10" /></Link>


            <ul className="flex justify-center items-center gap-6 mt-2">
                <li className='hover:text-dark-slate-blue hover:underline '  >
                    <Link to='/home' >Dashboard</Link>
                </li>
                <li className='hover:text-dark-slate-blue hover:underline '  >
                    <Link to='/features' >Features</Link>
                </li>
                <li className='hover:text-dark-slate-blue hover:underline '  >
                    <Link to='/pricing' >Pricing</Link>
                </li>
                <li className='hover:text-dark-slate-blue hover:underline '  >
                    <Link to='/about' >About</Link>
                </li>
                <li className='hover:text-dark-slate-blue hover:underline '  >
                    <Link to='/contact' >Contact</Link>
                </li>
            </ul>
            <div className="flex justify-end items-center gap-8">

                <>
                    {
                        loggedUser
                            ?
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='px-2 py-0.5 '   >
                                        <div className='flex justify-end items-center gap-2 ' >
                                            <span className='text-xl font-medium text-muted-foreground ' >{loggedUser?.username}</span>
                                            <Avatar>
                                                <AvatarImage src={loggedUser?.profilePicture} className='object-cover' />
                                                <AvatarFallback className='capitalize' >{loggedUser?.username?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => navigate('/profile')} >Profile</DropdownMenuItem>
                                        <DropdownMenuItem onClick={onLogout} >Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </>
                            :
                            <div className='flex justify-start gap-4' >
                                <Button variant='outline' size='lg' onClick={() => navigate('/auth/register')}  >
                                    Register
                                </Button>
                                <Button variant='default' size='lg' onClick={() => navigate('/auth/login')}  >
                                    Login
                                </Button>
                            </div>
                    }
                </>
            </div>
        </div>
    )
}

export default LandingPageNavbar