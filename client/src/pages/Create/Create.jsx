import { FormatColorFill, Palette, Cancel, VideoCallRounded, PhotoRounded, EmojiEmotionsRounded, Close, Lock, Camera, Title, FormatSize, LocationCityOutlined, PersonPinCircle, ArrowDropDown, Clear } from '@mui/icons-material'
import { image6 } from '../../assets'
import { Avatar, Slider } from '../../utils/Components'
import { LightenDarkenColor } from '../../utils/functions/function'
import { useState, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { Modal } from '@mui/material'
import { useStateContext } from '../../contexts/ContextProvider'
import FileBase64 from 'react-file-base64'
import { useRef } from 'react'
import { Image } from "@mui/icons-material"
import { Tooltip } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { createCode } from "../../redux/actions/code"

const CreateCode = () => {
    ///////////////////////////// VARIABLES /////////////////////////////////////
    const { users, isFetching } = useSelector(state => state.user)
    const fileBase64Ref = useRef()
    const dispatch = useDispatch()
    const { showCodeCreateModal, setShowCodeCreateModal } = useStateContext()

    ///////////////////////////// STATES ////////////////////////////////////////
    const initialCode = {
        title: '',
        description: '',
        code: '',
        tags: [],
        hashTags: [],
        likes: [],
        comments: [],
        shares: [],
        visibility: 'private',
    }
    const [codeData, setCodeData] = useState(initialCode)
    const [showVisibilityMenu, setShowVisibilityMenu] = useState(false)
    const [showTaggedModal, setShowTaggedModal] = useState(false)
    const [tagValue, setTagValue] = useState(``)
    const [hashTagValue, setHashTagValue] = useState('')
    const [showhashTagModal, setShowhashTagModal] = useState(false)

    ///////////////////////////// USE EFFECTS ///////////////////////////////////


    ///////////////////////////// FUNCTIONS //////////////////////////////////////
    const handleCreate = () => {
        dispatch(createCode(codeData, setShowCodeCreateModal))
    }
    const handleChange = (e) => {
        setCodeData(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }
    const tagFriend = (friend) => {
        if (Boolean(codeData.tags.find(tag => tag.user == friend._id))) {
            codeData.tags = codeData.tags.filter(tag => tag.user != friend._id)
            setCodeData({ ...codeData })
        }
        else {
            codeData.tags = codeData.tags.concat({ name: friend.name, user: friend._id })
            setCodeData({ ...codeData })
        }
    }

    const filterTag = (tagToDelete) => {
        codeData.tags = codeData.tags.filter(tag => tag !== tagToDelete)
        setCodeData({ ...setCodeData })
    }

    const handleFilterHashTag = (techToDelete) => {
        setCodeData({ ...codeData, hashTags: codeData.hashTags.filter((t) => t !== techToDelete) })
    }
    const handleAddHashTag = (e) => {
        if (!(e.key == 'Enter')) return
        const value = e.target.value
        if (!value.trim()) return
        setCodeData({ ...codeData, hashTags: codeData.hashTags.concat(value) })
        e.target.value = ""
        setHashTagValue('')
    }

    const addTag = (value) => {
        if (!value.trim()) return
        const isAlreadyAdded = codeData.hashTags.find(tag => tag == value)
        if (!isAlreadyAdded) {
            codeData.hashTags = [...codeData.hashTags, value]
            setTagValue(``)
            setCodeData({ ...codeData })
        }
    }




    const HashTag = ({ title }) => (
        <div className="flex gap-[8px] items-center justify-between rounded-[16px] py-[2px] px-[6px] bg-teal-blue w-auto " >
            <p className="text-white font-medium w-max text-[14px] " >{title}</p>
            <Clear style={{ fontSize: '1rem' }} onClick={() => handleFilterHashTag(title)} className={`cursor-pointer text-white text-[1rem] bg-lightGray  rounded-full `} />
        </div>
    )



    return (
        <>

            <div className='bg-white w-full min-h-[20rem] h-fit rounded-[8px] p-[1rem] ' >

                <div className='h-[12%] relative flex pb-[12px] ' >
                    <h4 className='text-[22px] font-bold text-dark-slate-blue ' >Create Code</h4>
                </div>


                <div className='min-h-[82%] h-auto flex flex-col justify-between gap-[8px] ' >

                    {/* avatar */}
                    <div className='flex gap-[1rem] ' >
                        <Avatar src={image6} />
                        <div className='flex flex-col ' >
                            <p className='font-semibold text-dark-slate-blue ' >Nauman Ch</p>
                            <div className='relative flex flex-col justify-center items-start gap-[4px] cursor-pointer rounded-t-[4px] min-w-[9rem] bg-gray-100 ' >

                                <button onClick={() => setShowVisibilityMenu(pre => !pre)} className='w-full flex justify-between items-center p-[2px] ' >
                                    <span className="flex justify-start gap-[2px] capitalize " >
                                        <Lock style={{ fontSize: '16px' }} className='text-[16px] ' />
                                        <span className='text-[12px] font-medium ' >{codeData.visibility}</span>
                                    </span>
                                    <ArrowDropDown />
                                </button>
                                {
                                    showVisibilityMenu &&
                                    <div className='w-full absolute top-full bg-white shadow-box flex flex-col items-start gap-[4px] rounded-b-[4px] ' >
                                        {
                                            menu.filter(m => m != codeData.visibility).map((item, index) => (
                                                <button key={index} onClick={() => { setShowVisibilityMenu(false); setCodeData({ ...codeData, visibility: item }) }} className='w-full gap-[2px] text-start hover:bg-teal-blue-lighten hover:text-white text-cool-gray capitalize p-[2px] ' >
                                                    <Lock style={{ fontSize: '16px' }} className='text-[16px] ' />
                                                    <span className='text-[12px] font-medium ' >{item}</span>
                                                </button>
                                            ))
                                        }
                                    </div>
                                }

                            </div>
                        </div>
                    </div>



                    <div className='flex flex-col gap-[8px] ' >
                        <div className="flex gap-[1rem] ">
                            <div className="flex flex-col gap-[4px] w-[55%] ">
                                <label htmlFor="description" className='flex-[1] text-cool-gray ' >Description<span className='text-[18px] text-teal-blue-darken ' >*</span> :</label>
                                <textarea
                                    rows={4}
                                    name='decription'
                                    placeholder='Write a short description of the code?....'
                                    value={codeData.description}
                                    onChange={handleChange}
                                    className={`h-full px-[4px] py-[2px] flex w-full outline-cool-gray bg-light-gray text-cool-gray border-cool-gray border-[1px] resize-none text-[16px] rounded-[4px] `}
                                />
                            </div>
                            <div className={`flex flex-col gap-[4px] w-[45%] `}  >
                                <div className='flex flex-col justify-start gap-[4px] w-full  ' >
                                    <label htmlFor="title" className='flex-[1] text-cool-gray ' >Title:</label>
                                    <textarea
                                        name='title'
                                        rows={2}
                                        placeholder='Your title here....'
                                        value={codeData.title}
                                        onChange={handleChange}
                                        className={`px-[4px] py-[2px] flex w-full outline-cool-gray bg-light-gray text-cool-gray border-cool-gray border-[1px] resize-none text-[16px] rounded-[4px] `}
                                    />
                                </div>
                                <div className="flex flex-col gap-[4px] ">
                                    <h6 className={`capitalize w-full text-[16px] text-cool-gray  `}>Technologies:</h6>
                                    <div className={`${codeData.hashTags.length && 'py-[8px] '} min-h-[54px] max-h-[12rem] overflow-y-scroll px-[8px] flex flex-wrap gap-[8px] w-full bg-light-gray text-cool-gray border-[1px] border-cool-gray rounded-[4px] `} >
                                        <input
                                            className="border-none resize-none h-[40px] py-[8px] bg-inherit outline-none text-[14px] text-cool-gray w-full rounded-[4px] "
                                            placeholder="Technologies - separated by enter"
                                            value={hashTagValue}
                                            onChange={(e) => setHashTagValue(e.target.value)}
                                            onKeyDown={handleAddHashTag}
                                        />
                                        {
                                            codeData.hashTags.map((tech, index) => (
                                                <HashTag title={tech} key={index} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* code */}
                        <div className='flex flex-col justify-start gap-[4px] ' >
                            <label htmlFor="code" className='flex-[1] text-cool-gray ' >Code<span className='text-[18px] text-teal-blue-darken ' >*</span> :</label>
                            <TextareaAutosize
                                rows={10}
                                maxRows={10}
                                name='code'
                                placeholder='Paste your code here....'
                                value={codeData.code}
                                onChange={handleChange}
                                className={`px-[4px] py-[2px] flex flex-[5] w-full outline-cool-gray bg-light-gray text-cool-gray border-cool-gray border-[1px] resize-none text-[16px] rounded-[4px] `}
                            />
                        </div>

                        {/* buttons */}
                        <div className='flex flex-col gap-[8px] ' >
                            {/* code button */}
                            <div className='flex justify-end ' >
                                <button onClick={handleCreate} disabled={!codeData.code} className={` ${!codeData.code ? 'cursor-not-allowed ' : 'cursor-pointer '}  w-[6rem] rounded-[4px] p-[4px] bg-teal-blue text-white font-medium text-[18px] `} >
                                    {isFetching ? 'Creating...' : 'Create'}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


            {/* showTaggedModal */}
            <Modal open={showTaggedModal} onClose={() => setShowTaggedModal(false)} className="flex justify-center items-center " >
                <div className="w-[20rem] h-[24rem] rounded-[8px] bg-neutral-800 " >
                    <div className="h-[24rem] p-[8px] " >
                        <h5 className="h-[10%] font-semibold " >Tag your friends:</h5>
                        <div className="h-[90%] flex flex-col gap-[8px] overflow-y-scroll " >
                            {
                                users.map((friend, index) => (
                                    <div key={index} onClick={() => tagFriend(friend)} className={`${Boolean(codeData.tags.find(tag => tag.user == friend._id)) ? 'bg-gray-100' : ' '} flex justify-start items-center gap-[1rem] hover:bg-gray-100 cursor-pointer px-[8px] py-[4px] rounded-[8px] `} >
                                        <Avatar />
                                        <div className="flex flex-col justify-start " >
                                            <p className="text-[14px] font-medium " >{friend.email}</p>
                                            <p className="text-[14px] text-text-emerald " >{friend.name}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Modal>



            {/* showhashTagModal */}
            <Modal open={showhashTagModal} onClose={() => setShowhashTagModal(false)} className="flex justify-center items-center " >
                <div className="w-[20rem] min-h-[10rem] max-h-[20rem] h-auto rounded-[8px] bg-neutral-800 " >
                    <div className="h-[15rem] p-[12px] flex flex-col gap-[12px] " >
                        <h5 className="h-[10%] font-semibold " >Add hashTags:</h5>
                        <div className="h-[10rem] flex flex-wrap gap-[8px] overflow-y-scroll  " >
                            {
                                codeData.hashTags.map((hashTag, index) => (
                                    <div key={index} className="h-fit " >
                                        <div className="w-fit flex gap-2 items-center justify-between rounded-[15px] py-[3px] px-[7px] bg-emerald-900 " >
                                            <span className="text-emerald-100 capitalize text-[12px] " >{hashTag}</span>
                                            <Cancel onClick={() => filterTag(hashTag)} style={{ fontSize: '12px' }} className={`cursor-pointer text-emerald-100 text-[12px] bg-emerald-900 rounded-full `} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <input
                            placeholder={`Type here`}
                            value={tagValue}
                            onChange={(e) => setTagValue(e.target.value)}
                            onKeyDown={(e) => e.key == `Enter` && addTag(e.target.value)}
                            className={`outline-none w-full  p-[2px] rounded-[4px] bg-gray-100 `}
                        />
                    </div>
                </div>
            </Modal>


        </>
    )




}

export default CreateCode







const menu = [
    'private',
    'public',
    'friends only',
    'all friends except',
    'only share with',
]