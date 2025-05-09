import React from 'react'
import { logo, logo_mini } from '@/assets'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { logout } from '@/redux/reducers/authSlice'

const LandingPageNavbar = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loggedUser } = useSelector((state: RootState) => state.user)

    ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
    const onLogout = () => {
        dispatch<any>(logout(navigate))
        toast.success('Logout successfully.')
    }


    return (
        <div className="flex justify-between items-center h-[6rem] w-full ">

            <Link to='/' >
                <div className='flex justify-center gap-1 w-full' >
                    <img src={logo_mini} alt="Logo" className="h-12" />
                    <img src={logo} alt="Logo" className="h-12" />
                </div>
            </Link>


            <ul className="flex justify-center items-center gap-6 mt-2">
                <li className='hover:text-blackish hover:underline '  >
                    <Link to='/home' >Dashboard</Link>
                </li>
                <li className='hover:text-blackish hover:underline '  >
                    <Link to='/features' >Features</Link>
                </li>
                <li className='hover:text-blackish hover:underline '  >
                    <Link to='/pricing' >Pricing</Link>
                </li>
                <li className='hover:text-blackish hover:underline '  >
                    <Link to='/about' >About</Link>
                </li>
                <li className='hover:text-blackish hover:underline '  >
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
                                            <div className="flex flex-col items-start">
                                                <h3 className="font-bolder text-sm capitalize " >{loggedUser?.firstName} {loggedUser?.lastName}</h3>
                                                <h4 className="font-bolder text-xs text-white/70" >@{loggedUser?.username}</h4>
                                            </div>
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