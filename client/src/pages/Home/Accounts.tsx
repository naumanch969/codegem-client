import { Person, MoreVert } from '@mui/icons-material'
import { Avatar } from '../../utils/Components'
import Cookie from 'js-cookie'
import { useStateContext } from '../../contexts/ContextProvider'
import { useState } from 'react'
import {useSelector, useDispatch}  from 'react-redux'

const Accounts = () => {
    //////////////////////////// VARIABLES ////////////////////////////////////
    const { accounts, loggedUser: user, users } = useSelector(state=>state.user)
    const loggedInAccounts = accounts.filter(account => account._id != user._id)            // switch accounts should not contain the current loggedIn user on this browser
    // const filteredSuggestedUsers = users.filter((user) => !loggedInAccounts.find(account => account._id == user._id))  // suggestedUsers should not contain the one who have accounts on this browser
    const suggestedUsers = users.filter((user) => user._id != user._id)        // suggestedUsers should not contain the current loggedIn user on this browser

    //////////////////////////// STATES ///////////////////////////////////////
    const [showMenu, setShowMenu] = useState(false)

    //////////////////////////// USE EFFECTS //////////////////////////////////

    //////////////////////////// FUNCTIONS /////////////////////////////////////
    const switchAccount = (account) => {
        // do --< loggedUser = account
        Cookie.set('profile', JSON.stringify(account))
    }

    return (
        <div className="w-full h-full flex flex-col gap-[24px] px-[4px] pt-[2rem] " >

            {
                Boolean(loggedInAccounts.length) &&
                <div className='flex flex-col gap-[1rem] '  >
                    <h4 className='font-semibold text-[18px] ' >Accounts</h4>
                    <div className='w-full flex flex-col gap-[12px]  ' >
                        {
                            loggedInAccounts.map((account, index) => (
                                <div key={index} onContextMenu={() => { }} className="relative flex justify-between items-center hover:bg-gray-100 cursor-pointer px-[8px] py-[4px] rounded-[8px]  " >
                                    <div className="flex justify-start items-center gap-[1rem] " >
                                        <Avatar />
                                        <div className="flex flex-col justify-start " >
                                            <p className="text-[14px] font-medium " >{account.email}</p>
                                            <p className="text-[14px] text-text-emerald " >{account.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-start items-center gap-1" >
                                        <button onClick={() => switchAccount(account)} className="text-[14px] text-link-blue cursor-poiner hover:underline " >switch</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }

            <div className='flex flex-col gap-[1rem] '  >
                <h4 className='font-semibold text-[18px] ' >People you may know:</h4>
                <div className='w-full flex flex-col gap-[12px]  ' >
                    {
                        suggestedUsers.map((account, index) => (
                            <div key={index} className="flex justify-between items-center hover:bg-gray-100 cursor-pointer px-[8px] py-[4px] rounded-[8px]  " >
                                <div className="flex justify-start items-center gap-[1rem] " >
                                    <Avatar />
                                    <div className="flex flex-col justify-start " >
                                        <p className="text-[14px] font-medium " >{account.email}</p>
                                        <p className="text-[14px] text-text-emerald " >{account.name}</p>
                                    </div>
                                </div>
                                <div className="" >

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>


        </div>
    )
}

export default Accounts;

