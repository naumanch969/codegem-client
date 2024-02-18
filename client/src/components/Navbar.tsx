import React from 'react'
import { useState, } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { logout } from "../redux/actions/auth"
import { } from 'lucide-react'
import { useStateContext } from "../contexts/ContextProvider"
import { RootState } from '../redux/store'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ChangeCircle, Dehaze, Logout, Person } from '@mui/icons-material'
import { Button } from './ui/button'
const Navbar = () => {

    ////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { setShowSidebar } = useStateContext()
    const { loggedUser, loggedUserToken } = useSelector((state: RootState) => state.user)

    ////////////////////////////////////////// STATES /////////////////////////////////////////////////////
    const [openAccountMenu, setOpenAccountMenu] = useState(false)

    ////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////

    ////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////
    const handleSignUpClick = () => {
        navigate('/auth/register')
    }

    const hanldeLoginClick = () => {
        navigate('/auth/login')
    }

    const handleLogout = () => {
        dispatch<any>(logout(navigate))
    }

    const handleAccountClick = () => {
        navigate("/profile")
    }


    return (
        <div style={{ boxShadow: '2px 2px 2px 2px rgb(0 0 0 / 10%)' }} className="sticky top-0 flex justify-between items-center h-[4rem] w-full lg:px-[2rem] md:px-[1.5rem] px-[4rem] z-[100] " >

            <div className="h-full flex items-center justify-between gap-[8px] " >
                <Button variant='ghost' size='sm' onClick={() => setShowSidebar(pre => !pre)} >
                    <Dehaze />
                </Button>
                <Link to='/' style={{ fontFamily: 'cursive' }} className="font-bolder text-2xl font-bold " >CodeGem</Link>
            </div>


            <div className=" " >
                {
                    loggedUserToken ?
                        <DropdownMenu>
                            <DropdownMenuTrigger className='flex items-center gap-1' >
                                <h3 className="font-bolder text-[16px] " >Hey, {loggedUser?.username}</h3>
                                <Avatar>
                                    <AvatarImage src={loggedUser?.profilePicture} alt={loggedUser?.username} />
                                    <AvatarFallback></AvatarFallback>
                                    {loggedUser?.username?.charAt(0)}
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className='cursor-pointer flex gap-x-1' onClick={handleAccountClick} ><Person />Account</DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer flex gap-x-1' onClick={() => { }}  ><ChangeCircle />Change Password</DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer flex gap-x-1' onClick={handleLogout} ><Logout />Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        :
                        <div className="flex justify-between items-center h-full gap-4 " >
                            <Button onClick={handleSignUpClick} variant='default' >Register</Button>
                            <Button onClick={hanldeLoginClick} variant='secondary' >Login</Button>
                        </div>
                }
            </div>

        </div >
    )
}

export default Navbar;