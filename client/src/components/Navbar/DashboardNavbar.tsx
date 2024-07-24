import React from 'react'
import { useState, } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { logout } from "@/redux/reducers/authSlice"
import { useStateContext } from "@/contexts/ContextProvider"
import { RootState } from '@/redux/store'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dehaze, Logout, NotificationImportant, Person, Person2TwoTone } from '@mui/icons-material'
import { Button } from '@/components/ui/button'
import { IconButton, Tooltip } from '@mui/material'
import { Bell, Moon, Sun } from 'lucide-react'

const DashboardNavbar = () => {

    ////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { setShowSidebar, mode } = useStateContext()
    const { loggedUser, loggedUserToken } = useSelector((state: RootState) => state.user)

    ////////////////////////////////////////// STATES /////////////////////////////////////////////////////

    ////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////

    ////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////
    const onRegisterClick = () => {
        navigate('/auth/register')
    }

    const onLoginClick = () => {
        navigate('/auth/login')
    }

    const onLogout = () => {
        dispatch<any>(logout(navigate))
    }

    const onAccountClick = () => {
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

            <div className="flex gap-4 " >
                <Tooltip title='Notifications' placement='top' >
                    <IconButton>
                        <Bell className='text-white' />
                    </IconButton>
                </Tooltip>
                <Tooltip title={`${mode == 'DARK' ? 'Light' : 'Dark'} Mode`} placement='top' >
                    <IconButton>
                        {
                            mode == 'DARK'
                                ? <Sun className='text-white' />
                                : <Moon className='text-white' />
                        }
                    </IconButton>
                </Tooltip>
                {
                    loggedUserToken ?
                        <DropdownMenu>
                            <DropdownMenuTrigger className='flex items-center gap-1' >
                                <h3 className="font-bolder text-[16px] " >Hey, {loggedUser?.username}</h3>
                                <Avatar>
                                    <AvatarImage src={loggedUser?.profilePicture} alt={loggedUser?.username} />
                                    <AvatarFallback className='text-primary text-2xl font-semibold flex justify-center items-center' >
                                        {loggedUser?.username?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className='cursor-pointer flex gap-x-1' onClick={onAccountClick} >
                                    <Link to='/profile' ><Person />Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer flex gap-x-1' onClick={onAccountClick} >
                                    <Link to='/more' ><Person2TwoTone />Personalize</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer flex gap-x-1' onClick={onLogout} >
                                    <Link to='/profile' ><Logout />Logout</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        :
                        <div className="flex justify-between items-center h-full gap-4 " >
                            <Button onClick={onRegisterClick} variant='default' >Register</Button>
                            <Button onClick={onLoginClick} variant='secondary' >Login</Button>
                        </div>
                }
            </div>

        </div >
    )
}

export default DashboardNavbar;