import { Favorite, Comment, Share, MoreHoriz, Close, ThumbUpAltOutlined, ThumbUpAlt } from '@mui/icons-material'
import { Avatar, Slider } from '../../utils/Components'
import { image2 } from '../../assets'
import { likeCode, commentCode } from '../../redux/actions/code'
import { limitText, dateObj } from '../../utils/functions/function'
import { useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

const Code = ({ code }) => {

    ///////////////////////////// VARIABLES /////////////////////////////////////
    const dispatch = useDispatch()
    const { users, loggedUser } = useSelector(state => state.user)
    const findedUser = users.find(user => user._id == code?.user)
    const userId = loggedUser?._id

    ///////////////////////////// STATES ////////////////////////////////////////
    const [showFullContent, setShowFullContent] = useState(false)
    const hasLikedCode = code?.likes?.find((id) => id === userId)
    const date = dateObj(code?.createdAt)

    ///////////////////////////// USE EFFECTS ///////////////////////////////////

    ///////////////////////////// FUNCTIONS //////////////////////////////////////
    const likeCodeFunc = () => {
        dispatch(likeCode(code?._id))
        if (hasLikedCode) {
            code.likes = code?.likes.filter((id) => id !== userId)
        } else {
            code.likes = [...code?.likes, userId]
        }
    }



    ///////////////////////////// COMPONENTS //////////////////////////////////////
    const Likes = () => {         // new to me
        if (code?.likes.length > 0) {
            return hasLikedCode
                ? (<> <ThumbUpAlt fontSize="small" /> &nbsp; {code?.likes.length > 2 ? `You and ${code?.likes.length - 1} others` : `${code?.likes.length} Like${code?.likes.length > 1 ? 's' : ''}`}  </>)    // if user likes the code
                : (<> <ThumbUpAltOutlined fontSize="small" /> &nbsp; {code?.likes.length} {code?.likes.length > 1 ? "Likes" : "Like"} </>)      // if user does not like the code
        }
        return <> <ThumbUpAltOutlined fontSize="small" />&nbsp;'Like'</>
    }


    return (
        <div className="w-full bg-neutral-800 p-[1rem] flex flex-col gap-[8px] rounded-[8px] " >
            {/* topbar */}
            <div className="w-full flex justify-between items-start " >
                {/* profile picture */}
                <div className="flex justify-start items-center gap-[1rem] " >
                    <Avatar src={code?.image} />
                    <div className="flex flex-col items-start  " >
                        <h6 className="" >{findedUser?.name}</h6>
                        <p className="" >{moment(code?.createdAt).fromNow()}</p>
                    </div>
                </div>
                {/* close and more button */}
                <div className="flex items-center justify-end gap-[8px] " >
                    <button className="w-[2rem] h-[2rem] rounded-full hover:bg-gray-100 flex justify-center items-center  " >
                        <MoreHoriz />
                    </button>
                    <button className="w-[2rem] h-[2rem] rounded-full hover:bg-gray-100 flex justify-center items-center  " ><Close /></button>
                </div>
            </div>

            <div className='flex flex-col gap-[1rem] ' >
                <div className="w-full " >
                    {/* description */}
                    <p className="" >
                        {/* {showFullContent && code?.description?.length ? code?.description : limitText(code?.description, 750)} */}
                        <span onClick={() => setShowFullContent(pre => !pre)} className='text-link-blue cursor-pointer hover:underline ' >
                            {code?.description.length > 750 && (showFullContent ? 'show less' : 'show more')}
                        </span>
                    </p>
                    {/* hashtags */}
                    <div className="flex flex-wrap justify-start items-center gap-[8px] leading-[16px] " >
                        {
                            code?.hashTags?.map((hashTag, index) => (
                                <a key={index} className="text-link-blue italic hover:underline cursor-pointer " >#{hashTag}</a>
                            ))
                        }
                    </div>
                </div>
        
            </div>

            <div className='w-full flex flex-col items-center gap-[8px] ' >
                {/* like, comment and share counts */}
                <div className="flex justify-between items-center w-full " >
                    {/* like counts */}
                    <div className="" >
                        <div className="flex  gap-[4px] " >
                            <Favorite className="text-text-emerald " />
                            <p className="" >{code?.likes?.length && code?.likes?.length}</p>
                        </div>
                    </div>
                    {/* comment and share counts */}
                    <div className="flex justify-between items-end gap-[1rem] " >
                        <div className="flex gap-[4px] " >
                            <p className="" >{code?.comments?.length && code?.comments?.length} </p>
                            <Comment className="text-text-emerald " />
                        </div>
                        <div className="flex gap-[4px] " >
                            <p className="" >{code?.shares?.length && code?.shares?.length}</p>
                            <Share className="text-text-emerald " />
                        </div>
                    </div>
                </div>

                <hr className='w-full text-emerald-100 ' />

                <div className="w-full flex justify-around items-center " >
                    <div className="flex items-end gap-[4px]  py-[4px] px-[8px] rounded-[8px] hover:bg-gray-100" >
                        <button onClick={() => likeCodeFunc()} className="text-emerald-900 " >
                            <Likes />
                        </button>
                    </div>
                    <div className="flex items-end gap-[4px]  py-[4px] px-[8px] rounded-[8px] hover:bg-gray-100" >
                        <button className="text-emerald-900  " ><Comment /></button>
                        <p className="text-emerald-900 " >31 Comment</p>
                    </div>
                    <div className="flex items-end gap-[4px]  py-[4px] px-[8px] rounded-[8px] hover:bg-gray-100" >
                        <button className="text-emerald-900  " ><Share /></button>
                        <p className="text-emerald-900 " >24 Shares</p>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Code