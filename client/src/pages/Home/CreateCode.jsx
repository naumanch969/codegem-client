import { FormatColorFill, Palette, Cancel, VideoCallRounded, PhotoRounded, EmojiEmotionsRounded, Close, Lock, Camera, Title, FormatSize, LocationCityOutlined, PersonPinCircle, ArrowDropDown } from '@mui/icons-material'
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
import { useDispatch , useSelector} from "react-redux"
import { motion } from "framer-motion"
import { createCode } from "../../redux/actions/code"

const CreateCode = () => {
    ///////////////////////////// VARIABLES /////////////////////////////////////
    const { users } = useSelector(state=>state.user)
    const fileBase64Ref = useRef()
    const dispatch = useDispatch()

    ///////////////////////////// STATES ////////////////////////////////////////
      const initialCode = {
        content: { text: '', selected: [] },
        images: [],
        tags: [],
        hashTags: [],
        likes: [],
        comments: [],
        shares: [],
        styles: {
            background: { show: false, value: '#fff' },
            color: { show: false, value: 'black' },
            fontSize: { show: false, value: '16' },
            fontWeight: { show: false, value: '500' },
        },
        visibility: 'private',
        createdAt: Date.now(),
        updatedAt: Date.now(),
    }
    const [codeData,setCodeData] = useState(initialCode)
    const [showModal, setShowModal] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showTaggedModal, setShowTaggedModal] = useState(false)
    const [tagValue, setTagValue] = useState(``)
    const [showhashTagModal, setShowhashTagModal] = useState(false)
    const [showImageBlock, setShowImageBlock] = useState(false)

    const initialCodeStyle = { background: { show: false, value: '#fff' }, color: { show: false, value: '#fff' }, fontSize: { show: false, value: codeData.content.text.length < 100 ? '24' : '16' }, fontWeight: { show: false, value: '400' }, }
    ///////////////////////////// USE EFFECTS ///////////////////////////////////

    
    ///////////////////////////// FUNCTIONS //////////////////////////////////////
    const handleImageButtonClick = () => {
        fileBase64Ref.current.querySelector('input[type="file"]').click();
    }

    const addImageFunc = (files) => {
        const uploaded = [...codeData.images]
        files.some((file) => {
            uploaded.push(file.base64)
        })
        setCodeData({...codeData, images:uploaded})
    }

    const showStyleOptions = (attribute) => {
        for (let key in codeData.styles) {
            if (key == attribute) {         // key = background || color || fontSize || fontWeight , attribute = button style button on which _id has clicked
                codeData.styles[key].show = !codeData.styles[attribute].show
                setCodeData({ ...codeData })
            }
            else {
                codeData.styles[key].show = false
                setCodeData({ ...codeData })
            }
        }
    }

    const closeModal = () => {
        setShowModal(false)
        // setCodeState({ ...codeState, codeData: initialCode, styles: initialCodeStyle })
        setCodeData(initialCode)
    }

    const handleCreateCode = () => {
        const { content, images, tags, hashTags, likes, comments, shares, styles, visibility } = codeData
        dispatch(createCode({ content, images, tags, hashTags, likes, comments, shares, styles, visibility }))
        closeModal()
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

    const addTag = (value) => {
        if (!value.trim()) return
        const isAlreadyAdded = codeData.hashTags.find(tag => tag == value)
        if (!isAlreadyAdded) {
            codeData.hashTags = [...codeData.hashTags, value]
            setTagValue(``)
            setCodeData({ ...codeData })
        }
    }






    return (
        <div className="flex flex-col gap-[12px] w-full h-fit bg-neutral-800 p-[1rem] rounded-[8px] " >
            <div className="w-full flex justify-between items-center " >
                <Avatar src={image6} />
                <button onClick={() => setShowModal(true)} className="w-[88%] h-[42px] bg-gray-100 hover:bg-gray-200 rounded-[30px] text-start pl-[16px] " >Share your feelings with the world</button>
            </div>
            <hr className="bg-gray-100 " />
            <div className="flex justify-center items-center gap-[2rem] " >
                <button onClick={() => setShowModal(true)} className="flex items-center gap-[4px] p-[4px] font-medium text-text-emerald hover:bg-gray-100 rounded-[6px] px-[1rem] py-[4px] " ><PhotoRounded style={{ fontSize: '26px' }} className="text-green text-[26px] " /><span className="" >Photo</span></button>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-[4px] p-[4px] font-medium text-text-emerald hover:bg-gray-100 rounded-[6px] px-[1rem] py-[4px] " ><VideoCallRounded style={{ fontSize: '26px' }} className="text-red text-[26px] " /><span className="" >Video</span></button>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-[4px] p-[4px] font-medium text-text-emerald hover:bg-gray-100 rounded-[6px] px-[1rem] py-[4px] " ><EmojiEmotionsRounded style={{ fontSize: '26px' }} className="text-orange text-[26px] " /><span className="" >Mode/Activity</span></button>
            </div>






            <Modal open={showModal} onClose={() => closeModal()} className='flex justify-center items-center ' >
                <div className='bg-neutral-800 w-[36rem] h-[28rem] rounded-[8px] p-[1rem] overflow-y-scroll  ' >

                    <div className='h-[12%] relative flex justify-center items-center pb-[12px] ' >
                        <h4 className='text-[18px] font-bold text-black ' >Create Code</h4>
                        <button onClick={() => setShowModal(false)} className='absolute right-0 w-[2rem] h-[2rem] rounded-full bg-gray-100 ' ><Close /></button>
                    </div>

                    <hr className='h-[4%] w-full py-[12px]   ' />

                    <div className='min-h-[82%] h-auto flex flex-col justify-between gap-[8px] ' >

                        {/* avatar */}
                        <div className='flex gap-[1rem] ' >
                            <Avatar src={image6} />
                            <div className='flex flex-col ' >
                                <p className='font-semibold ' >Nauman Ch</p>
                                <div className='relative flex flex-col justify-center items-start gap-[4px] cursor-pointer rounded-t-[4px] min-w-[9rem] bg-gray-100 ' >

                                    <button onClick={() => setShowMenu(pre => !pre)} className='w-full flex justify-between items-center p-[2px] ' ><span className="flex justify-start gap-[2px] capitalize " ><Lock style={{ fontSize: '16px' }} className='text-[16px] ' /><span className='text-[12px] font-medium ' >{codeData.visibility}</span></span><ArrowDropDown /></button>
                                    {
                                        showMenu &&
                                        <div className='w-full absolute top-full bg-gray-100 flex flex-col items-start gap-[4px] rounded-b-[4px] ' >
                                            {
                                                menu.filter(m => m != codeData.visibility).map((item, index) => (
                                                    <button key={index} onClick={() => { setShowMenu(false);  setCodeData({ ...codeData,visibility : item }) }} className='w-full gap-[2px] text-start hover:bg-gray-200 capitalize p-[2px] ' ><Lock style={{ fontSize: '16px' }} className='text-[16px] ' /><span className='text-[12px] font-medium ' >{item}</span></button>
                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                        {/* textarea */}
                        <div className=' ' >
                            <TextareaAutosize
                                minRows={codeData.content.text.length < 100 ? 4 : 8}
                                maxRows={8}
                                placeholder='Your Content'
                                value={codeData.content.text}
                                onChange={(e) => { codeData.content.text = e.target.value; setCodeData({ ...codeData  }) }}
                                className={`w-full resize-none outline-none ${codeData.content.text.length < 100 ? 'text-[24px] ' : 'text-[16px]'} bg-[${codeData.styles.background.value}] p-[4px] rounded-[4px] `}
                                style={{ background: codeData.styles.background.value, color: codeData.styles.color.value, fontSize: `${codeData.styles.fontSize.value}px`, fontWeight: codeData.styles.fontWeight.value, }}
                            />
                            <div className='flex flex-wrap gap-[8px] ' >
                                {
                                    codeData.hashTags.map((tag, index) => (
                                        <span key={index} className='text-link-blue italic hover:underline cursor-pointer ' >#{tag}</span>
                                    ))
                                }
                            </div>
                        </div>
                        {
                            showImageBlock &&
                            <div className='min-h-[10rem] w-full flex justify-center items-center bg-gray-500 rounded-[4px] ' >
                                {
                                    <>
                                        {
                                            codeData.images.length
                                                ?
                                                <div className="relative h-[12rem] w-full " >
                                                    <div className="thin_horizontal_scrollbar relative h-full w-full flex justify-start overflow-x-scroll overflow-y-hidden " >
                                                        {
                                                            codeData.images.map((img, index) => (
                                                                <img key={index} src={img} alt="img" className="h-full  " />
                                                            ))
                                                        }
                                                        <div ref={fileBase64Ref} id="filebase_image" className="min-w-[15rem] h-full bg-gray-700 flex justify-center items-center " >
                                                            <button onClick={() => handleImageButtonClick()} className="flex flex-col justify-center items-center  " >
                                                                <Camera /> Add Photo
                                                            </button>
                                                            <FileBase64 type="file" multiple={true} onDone={(filesArr) => addImageFunc(filesArr)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div ref={fileBase64Ref} id="filebase_image" className=" " >
                                                    <button onClick={() => handleImageButtonClick()} className="flex flex-col justify-center items-center  " >
                                                        <Camera /> Add Photo
                                                    </button>
                                                    {/* filebase64 component have display none */}
                                                    <FileBase64
                                                        type="file"
                                                        multiple={true}
                                                        onDone={(filesArr) => {
                                                            addImageFunc(filesArr)
                                                        }
                                                        }
                                                    />
                                                </div>
                                        }
                                    </>
                                }


                            </div>
                        }

                        {/* buttons */}
                        <div className='flex flex-col gap-[8px] ' >
                            <div className="flex flex-col justify-between items-start gap-[8px] rounded-[4px] p-[8px] bg-gray-200 " >
                                <h4 className="text-[18px] font-medium " >Add to Code</h4>
                                <div className="flex justify-between items-center w-full " >
                                    {/* buttons */}
                                    <div className='flex gap-[1rem] ' >
                                        {
                                            stylesArr.map((style, index) => (           //   style.attribute = `background` || `color` || `fontSize` || `fontWeight`
                                                <div key={index} className="relative " >
                                                    <button onClick={() => showStyleOptions(style.attribute)} className={` ${codeData.styles[style.attribute].show && 'bg-gray-100'} w-[2rem] h-[2rem] rounded-[8px] hover:bg-gray-100 `}><style.icon /></button>
                                                    {
                                                        codeData.styles[style.attribute].show &&
                                                        <div className='transition-all bg-gray-500 p-[4px] rounded-[8px] absolute bottom-[110%] flex gap-[8px] ' >
                                                            {
                                                                style.array.map((item, index) => (      // item = hexCode || fontSize || fontWeight, 
                                                                    <button
                                                                        key={index}
                                                                        onClick={() => { codeData.styles[style.attribute].value = item; codeData.styles[style.attribute].show = true; setCodeData({ ...codeData }) }}
                                                                        style={{ [style.attribute == 'color' ? 'background' : style.attribute]: item }}
                                                                        className={`${item == codeData.styles[style.attribute].value && 'border-[2px] border-gray  '} text-[14px] bg-gray-300 w-[24px] h-[24px] rounded-[8px]`}
                                                                    >
                                                                        {style.item ? style.item : item}   {/* for fontSize, style.item is undefined so item is displayed */}
                                                                    </button>
                                                                ))
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    {/* image, video, location, emoji */}
                                    <div className='flex justify-end items-center gap-[1rem] ' >
                                        <button onClick={() => setShowImageBlock(pre => !pre)} className='w-[2rem] h-[2rem] rounded-full text-green hover:bg-gray-100 '><PhotoRounded /></button>
                                        <button onClick={() => setShowhashTagModal(pre => !pre)} className='w-[2rem] h-[2rem] rounded-full text-red hover:bg-gray-100 '><VideoCallRounded /></button>
                                        <button className='w-[2rem] h-[2rem] rounded-full text-orange hover:bg-gray-100 '><EmojiEmotionsRounded /></button>
                                        <button className='w-[2rem] h-[2rem] rounded-full text-blue hover:bg-gray-100 '><LocationCityOutlined /></button>
                                        <button onClick={() => setShowTaggedModal(true)} className='w-[2rem] h-[2rem] rounded-full text-emerald hover:bg-gray-100 '><PersonPinCircle /></button>
                                    </div>
                                </div>
                            </div>

                            {/* code button */}
                            <div className='' >
                                <button onClick={() => handleCreateCode()} disabled={!codeData.content.text} className={` ${codeData.content.text ? 'bg-emerald-500' : 'bg-gray-500'}  w-full rounded-[4px] p-[4px] text-white font-medium text-[18px] `} >Code</button>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>














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

        </div>
    )




}

export default CreateCode






const backgrounds = [
    '#fff',
    '#652826',
    '#0c3b5f',
    '#245a24',
    '#655d1a',
    '#3b3f43',
    '#492e18',
    '#674917',
    '#47265d',
    '#00514c',
    '#16565f',
    '#641e43'
]
const colors = [
    '#652826',
    '#0c3b5f',
    '#245a24',
    '#655d1a',
    '#3b3f43',
    '#492e18',
    '#674917',
    '#47265d',
    '#00514c',
    '#16565f',
    '#641e43'
]
const sizes = [
    '12',
    '14',
    '16',
    '18',
    '20',
    '24',
    '32',
    '40',
    '48',
    '56',
    '64',
    '72',
]
const weights = [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
]

const stylesArr = [
    {
        array: colors,
        icon: FormatColorFill,
        item: <span className={`w-full h-full rounded-[8px]  `} />,
        attribute: 'background',
        style: 'background'
    },
    {
        array: colors,
        icon: Palette,
        item: 'T',
        attribute: 'color',
        style: 'color'
    },
    {
        array: sizes,
        icon: FormatSize,
        attribute: 'fontSize',
        style: 'fontSize'
    },
    {
        array: weights,
        icon: Title,
        item: 'T',
        attribute: 'fontWeight',
        style: 'fontWeight'
    },
]


const menu = [
    'private',
    'public',
    'friends only',
    'all friends except',
    'only share with',
]
const friends = [

]