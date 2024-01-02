import React, { useState, useEffect } from "react"
import {
    HomeOutlined, PersonOutlined, GroupOutlined, CollectionsBookmarkOutlined, NotificationsNoneOutlined, AddBoxOutlined, AccountCircleOutlined, DensityMediumOutlined,
    Home, Person, Group, CollectionsBookmark, NotificationsNone, AddBox, AccountCircle, DensityMedium, Code, CodeOutlined,
    FormatAlignCenterSharp
} from "@mui/icons-material"
import { lowercase } from '../utils/functions/function'
import { Tooltip } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { useStateContext } from "../contexts/ContextProvider"


const Sidebar = () => {

    //////////////////////////////// VARIABLES //////////////////////////////////////
    const location = useLocation()
    const { showSidebar, setShowSidebar } = useStateContext()

    //////////////////////////////// STATES /////////////////////////////////////////
    const [route, setRoute] = useState(location.pathname.split('/'))
    //////////////////////////////// USE EFFECTS ////////////////////////////////////


    //////////////////////////////// FUNCTIONS //////////////////////////////////////

    return (
        <div style={{ height: 'calc(100vh-4rem)' }} className={`h-full w-full flex gap-[1.5rem] py-[1.5rem] overflow-y-scroll ${showSidebar ? 'px-[1rem]' : 'px-0 '} `}>
            {
                showSidebar
                    ?
                    <div className={`flex flex-col justify-start gap-[1rem] w-full h-full`}>
                        {
                            sidebarLinks.map((item, index) => (
                                <Link
                                    key={index}
                                    to={`/${lowercase(item.name)}`}
                                    onClick={() => setRoute(['', lowercase(item.name)!])}
                                    className={`${route[1] == lowercase(item.name) && 'font-extrabold bg-dark-slate-blue-lighten text-teal-blue '} hover:bg-dark-slate-blue-lighten hover:text-white flex gap-[12px] py-[10px] px-[6px] w-full capitalize rounded-[4px] cursor-pointer `}
                                >
                                    {
                                        route[1] == lowercase(item.name)
                                            ?
                                            <item.iconFilled className='' />
                                            :
                                            <item.iconOutlined className='' />
                                    }
                                    <span className={`${route[1] == lowercase(item.name) && 'font-bold bg-dark-slate-blue-lighten text-teal-blue '} hover:bg-dark-slate-blue-lighten hover:text-white  text-[18px] font-medium `} >{item.name}</span>
                                </Link>))
                        }
                    </div>
                    :
                    <div className={`flex flex-col justify-start gap-[8px] w-full h-full`}>
                        {
                            sidebarLinks.map((item, index) => (
                                <Tooltip
                                    key={index}
                                    placement='right' title={item.name}
                                >
                                    <Link
                                        to={`/${lowercase(item.name)!.split('/')}`}
                                        onClick={() => setRoute(['', lowercase(item.name)!])}
                                        className={`py-[4px] px-[6px] w-full rounded-[4px]   cursor-pointer flex justify-center items-center `}
                                    >
                                        {
                                            route[2] == lowercase(item.name)
                                                ?
                                                <button className={`${route[2] == lowercase(item.name) && 'font-extrabold bg-dark-slate-blue-lighten text-teal-blue '} hover:bg-dark-slate-blue-lighten hover:text-white w-[40px] h-[40px] rounded-full `} >
                                                    <item.iconFilled className={``} />
                                                </button>
                                                :
                                                <button className={`${route[2] == lowercase(item.name) && 'font-extrabold bg-dark-slate-blue-lighten text-teal-blue '} hover:bg-dark-slate-blue-lighten hover:text-white w-[40px] h-[40px] rounded-full `} >
                                                    <item.iconOutlined className={``} />
                                                </button>
                                        }
                                    </Link>
                                </Tooltip>
                            ))
                        }
                    </div>
            }
        </div>
    )
}
export default Sidebar



const sidebarLinks = [
    {
        name: 'Home',
        iconFilled: Home,
        iconOutlined: HomeOutlined
    },
    {
        name: 'Streaks',
        iconFilled: Home,
        iconOutlined: HomeOutlined
    },
    {
        name: 'Codes',
        iconFilled: Code,
        iconOutlined: CodeOutlined
    },
    {
        name: 'Challenges',
        iconFilled: FormatAlignCenterSharp,
        iconOutlined: HomeOutlined
    },
    {
        name: 'Friends',
        iconFilled: Person,
        iconOutlined: PersonOutlined
    },
    {
        name: 'Groups',
        iconFilled: Group,
        iconOutlined: GroupOutlined
    },
    {
        name: 'Collections',
        iconFilled: CollectionsBookmark,
        iconOutlined: CollectionsBookmarkOutlined
    },
    {
        name: 'Notifications',
        iconFilled: NotificationsNone,
        iconOutlined: NotificationsNoneOutlined
    },
    {
        name: 'Create',
        iconFilled: AddBox,
        iconOutlined: AddBoxOutlined
    },
    {
        name: 'Profile',
        iconFilled: AccountCircle,
        iconOutlined: AccountCircleOutlined
    },
    {
        name: 'More',
        iconFilled: DensityMedium,
        iconOutlined: DensityMediumOutlined
    },
]
