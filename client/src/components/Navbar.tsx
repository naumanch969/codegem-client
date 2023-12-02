import React from 'react'
import { Dehaze, AccountCircle, DashboardOutlined, SavedSearch, Logout } from "@mui/icons-material"
import { useState, useEffect, useRef } from "react"
import { AppBar, Avatar, Card, IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { logout } from "../redux/actions/user"
import { motion } from 'framer-motion'
import { useStateContext } from "../contexts/ContextProvider"
import { RootState } from '../redux/store'

const Navbar = () => {

    ////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { setShowSidebar } = useStateContext()
    const { loggedUser } = useSelector((state: RootState) => state.user)

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
        setOpenAccountMenu(false)
    }

    const handleAccountClick = () => {
        navigate("/profile")
        setOpenAccountMenu(false)
    }



    const Menu = () => (
        <motion.div animate={{ x: [100, 0], opacity: [0, 1] }} className="absolute z-[50] shadow-box top-[3rem] items-start right-0 w-[15rem] h-auto flex flex-col gap-[4px] p-[8px] border-[2px] bg-white text-dark-slate-blue border-warm-gray-dark rounded-[4px]">
            <button onClick={handleAccountClick} className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-[6px] gap-2" ><AccountCircle /> <span className="" >Account</span> </button>
            <button className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-[6px] gap-2" ><DashboardOutlined /> <span className="" >Dashboard</span> </button>
            <button className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-[6px] gap-2" ><SavedSearch /> <span className="" >Saved</span> </button>
            <button onClick={handleLogout} className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-[6px] gap-2" ><Logout /> <span className="" >Logout</span> </button>
        </motion.div>
    )

    return (
        <div style={{ boxShadow: '2px 2px 2px 2px rgb(0 0 0 / 10%)' }} className="sticky top-0 flex justify-between items-center h-[4rem] w-full lg:px-[2rem] md:px-[1.5rem] px-[4rem] z-[100] " >

            <div className="h-full flex items-center justify-between gap-[8px] " >
                <button className='w-[40px] h-[40px] rounded-full hover:bg-dark-slate-blue-lighten' onClick={() => setShowSidebar(pre => !pre)} ><Dehaze className="" /></button>
                <Link to='/' style={{ fontFamily: 'cursive' }} className="font-bolder text-[2rem] font-bold " >CodeGem</Link>
            </div>


            <div className=" " >
                {
                    loggedUser ?
                        <div className="relative flex gap-4 items-center " >
                            <div className="flex gap-[8px] items-center justify-center " >
                                <h3 className="font-bolder text-[16px] " >Hello, {loggedUser?.username}</h3>
                                <div className="relative" >
                                    <div className="relative" >
                                        <Avatar onClick={() => setOpenAccountMenu((prev) => !prev)} className="bg-emerald-200 cursor-pointer capitalize " >{loggedUser?.username?.charAt(0)}</Avatar>   {/* #423e65 */}
                                        {openAccountMenu && <Menu />}
                                    </div>
                                    {
                                        openAccountMenu && <Menu />
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div className="flex justify-between items-center h-full gap-4 " >
                            <button style={{ boxShadow: '0px 0px 2px 4px rgb(0 0 0 / 20%)' }} onClick={handleSignUpClick} className="bg-bright-green text-white px-4 py-2 rounded-full" >Register</button>
                            <button onClick={hanldeLoginClick} className="bg-teal-blue text-white px-4 py-2 rounded-full ml-4" >Login</button>
                        </div>
                }
            </div>

        </div>
    )
}

export default Navbar;