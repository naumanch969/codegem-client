import React, { useEffect, useState } from 'react';
import { MoreVert, ThumbUpOutlined, Share, Comment, Save, CopyAll, Report, Delete, Update, ThumbUp, BookmarkBorderOutlined, Bookmark, CopyAllOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { image1 } from '../../assets';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { commentCode, likeCode, saveCode } from '../../redux/actions/code';
import { format } from 'timeago.js'
import DeleteModal from './Delete';
import UpdateModal from './Update';
import { getCodeReducer } from '../../redux/reducers/code';
import ShareCode from './ShareCode';
import { Code, Collection, User } from '../../interfaces';
import { RootState } from '../../redux/store';
import SaveCode from './SaveCode';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { getComments } from '../../redux/actions/comment';
import { Loader } from '../../utils/Components';
import { useCodeModal } from '../../hooks/useCodeModal';


const CodeComponent = ({ code }: { code: Code }) => {

  /////////////////////////////////////// VARIABLES ////////////////////////////////////////
  const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user);
  const { userCollections }: { userCollections: Collection[] } = useSelector((state: RootState) => state.collection);
  const savedCollection = userCollections.filter(collection => collection.name == 'Saved')
  const userId = loggedUser?._id
  const isCodeSaved = savedCollection[0]?.codes?.findIndex(c => c._id == code?._id) != -1
  const dispatch = useDispatch();
  const { onOpen, onSetCode } = useCodeModal()

  /////////////////////////////////////// STATES ////////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openShareModal, setOpenShareModal] = useState(false)
  const [openSaveModal, setOpenSaveModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [copy, setCopy] = useState(false);
  const [commentContent, setCommentContent] = useState<string>('')
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false)

  /////////////////////////////////////// USE EFFECTS ////////////////////////////////////////
  useEffect(() => {
    if (!showComments) return
    if (code.comments.length == 0) return
    const refetch = code.comments.every(comment => typeof comment == 'string')
    if (refetch) {
      dispatch<any>(getComments(code?._id!, 'code', setCommentsLoading))
    }
  }, [showComments])



  /////////////////////////////////////// FUNCTIONS ////////////////////////////////////////
  const handleLikeCode = () => {
    dispatch<any>(likeCode(code?._id as string, userId!));
    // TODO
    // if (isCodeLiked) {
    //   code.likes = code?.likes.filter((id) => id !== userId)
    // } else {
    //   code.likes = [...code?.likes!, userId!]
    // }
  };
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code?.code);
    setShowMenu(false); // Close the menu after copying
  };
  const handleOpenUpdateModal = () => {
    setShowMenu(false);
    dispatch(getCodeReducer(code))
    onSetCode(code)
    onOpen()
  }
  const handleOpenSaveModal = () => {
    setShowMenu(false);
    setOpenSaveModal(true)
  }
  const handleOpenDeleteModal = () => {
    setShowMenu(false);
    setOpenDeleteModal(true)
  }
  const handleSave = () => {
    dispatch<any>(saveCode(code, isCodeSaved ? 'unsave' : 'save'))
  }
  const hanldeCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 3000);
  }
  const handleComment = () => {
    if (!commentContent) return
    dispatch<any>(commentCode(code?._id!, commentContent, loggedUser!))
    dispatch<any>(getComments(code?._id!, 'code', setCommentsLoading))
    setCommentContent('')
  }

  /////////////////////////////////////// COMPONENTS ////////////////////////////////////////
  const Menu = () => (
    <motion.div animate={{ x: [100, 0], opacity: [0, 1] }} className="absolute z-[50] shadow-box top-[3rem] items-start right-0 w-[15rem] h-auto flex flex-col gap-[4px] p-[8px] border-[2px] bg-white text-dark-slate-blue border-warm-gray-dark rounded-[4px]">
      <button onClick={handleOpenSaveModal} className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-[6px] gap-2"><Save /><span className="">Save</span></button>
      <button onClick={handleCopyCode} className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-[6px] gap-2"><CopyAll /><span className="">Copy</span></button>
      {/* String(loggedUser._id) == String(code?.user) && */}
      {
        <>
          <button onClick={handleOpenUpdateModal} className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-[6px] gap-2"><Update /><span className="">Update</span></button>
          <button onClick={handleOpenDeleteModal} className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-[6px] gap-2"><Delete /><span className="">Delete</span></button>
        </>
      }
      <button onClick={() => { setShowMenu(false) }} className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-[6px] gap-2"><Report /><span className="">Report</span></button>
    </motion.div>
  );

  return (
    <div className='w-full flex flex-col p-[1rem] bg-light-gray text-cool-gray-dark rounded-[6px]'>

      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} codeId={code?._id as string} />
      {openShareModal && <ShareCode open={openShareModal} setOpen={setOpenShareModal} code={code} />}
      {openSaveModal && <SaveCode open={openSaveModal} setOpen={setOpenSaveModal} code={code} />}

      {/* username */}
      <div className='flex justify-between items-center'>
        <div className='flex gap-[1rem]'>
          <div className='w-[3rem] h-[3rem] rounded-full'>
            <img src={image1} alt="image" className='w-full h-full rounded-full object-cover' />
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h5 className='text-[14px] font-semibold capitalize '>{code?.user?.firstName} {code?.user?.lastName}</h5>
            <p className='text-[12px] font-light '>{code?.user?.username}</p>
          </div>
          <div className='flex items-center'>
            <span className='text-teal-blue text-[14px] '>{format(code?.createdAt as Date)}</span>
          </div>
        </div>
        <div className="relative">
          <IconButton onClick={() => setShowMenu(prev => !prev)} className="bg-teal-blue cursor-pointer capitalize text-black"><MoreVert /></IconButton>
          {showMenu && <Menu />}
        </div>
      </div>

      <hr className='w-full h-[1px] bg-cool-gray-light border-none mt-[6px] mb-[6px]' />

      <div className='flex flex-col gap-[8px]'>
        {/* title, description, tags */}
        <div className='flex flex-col gap-[2px]'>
          {/* <h3 className='font-semibold text-[20px] capitalize '>{code?.title}</h3> */}
          <p className='text-[14px]'>{code?.description}</p>
          <div className='flex gap-[6px]'>
            {
              code?.tags?.map((tag, index) => (
                <span key={index} className='text-teal-blue italic hover:underline cursor-pointer lowercase '>#{tag.name}</span>
              ))
            }
          </div>
        </div>
        {/* code */}
        <div className='relative rounded-[8px] text-[14px] bg-cool-gray-dark '>
          <div className="flex justify-between items-center min-h-8 h-fit px-4 py-2 ">
            <h3 className='font-semibold text-[20px] capitalize text-white ' >{code?.title}</h3>
            {
              copy
                ?
                <button className='w-16 h-8 rounded-full text-white ' >Copied!</button>
                :
                <Tooltip placement='top-start' title='Copy'  ><button onClick={() => hanldeCopy(code?.code)} className='w-8 h-8 rounded-full ' ><CopyAllOutlined className='text-white' /></button></Tooltip>
            }
          </div>
          <SyntaxHighlighter
            style={atomOneDark}
            language="javascript"
            wrapLongLines={true}
            customStyle={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', padding: '12px', maxHeight: '22rem' }}
          >
            {code?.code}
          </SyntaxHighlighter>
        </div>
      </div>

      <hr className='w-full h-[1px] bg-cool-gray-light border-none mb-[6px] mt-[6px]' />

      {/* likes, share, comments */}
      <div className='flex justify-between items-center'>
        <div>
          <IconButton onClick={handleLikeCode} size='medium' >
            {code?.likes?.includes(loggedUser?._id as string) ? <ThumbUp fontSize="inherit" /> : <ThumbUpOutlined fontSize="inherit" />}
          </IconButton>
          <span className='text-[14px]'>{code?.likes?.length} people</span>
        </div>
        <div className='flex gap-[4px]'>
          <IconButton onClick={() => setOpenShareModal(true)} size='medium' className='relative'>
            <Share fontSize="inherit" />
            <span className='w-[18px] h-[18px] rounded-full absolute top-0 right-0 flex justify-center items-center text-[12px] bg-teal-blue-lighten text-white'>{code?.shares?.length}</span>
          </IconButton>
          <IconButton onClick={handleSave} size='medium' className='relative'>
            {
              isCodeSaved
                ?
                <Bookmark fontSize="inherit" />
                :
                <BookmarkBorderOutlined fontSize="inherit" />
            }
          </IconButton>
          <IconButton size='medium' className='relative' onClick={() => setShowComments((pre) => !pre)}>
            <Comment fontSize="inherit" />
            <span className='w-[18px] h-[18px] rounded-full absolute top-0 right-0 flex justify-center items-center text-[12px] bg-teal-blue-lighten text-white'>{code?.comments?.length}</span>
          </IconButton>
        </div>
      </div>

      {/* Comment Section */}
      {
        showComments &&
        <div className="flex flex-col mt-4 min-h-[8rem] max-h-[16rem] overflow-auto px-1">
          <div className='flex items-center space-x-3 mb-2'>
            <img src={image1} alt="user image" className='w-10 h-10 rounded-full object-cover' />
            <input
              type="text"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 p-2 border rounded-lg outline-none focus:border-teal-blue-lighten"
            />
            <button onClick={handleComment} className="p-2 bg-teal-blue-lighten text-white rounded-lg hover:bg-teal-blue">Send</button>
          </div>
          <div className='space-y-2 h-full '>
            {
              commentsLoading
                ?
                <div className='flex justify-center items-center h-full ' >
                  <Loader />
                </div>
                :
                <>
                  {
                    code.comments.length == 0
                      ?
                      <div className="flex justify-center items-center w-full h-full ">
                        <span className=''>No Comments to Show.</span>
                      </div>
                      :
                      <>
                        {code?.comments?.map((comment, index) => {
                          // Check if the comment is a string or a Comment object
                          const isString = typeof comment === 'string';
                          if (isString) return null
                          return (
                            <div key={index} className="flex items-start space-x-2">
                              <img src={image1} alt="user image" className='w-8 h-8 rounded-full object-cover' />
                              <div className='flex flex-col'>
                                <span className='text-sm font-semibold'>{(comment.user as User).username}</span>
                                <span className='text-sm'>{comment.content}</span>
                                <span className='text-xs text-gray-500'>{format(comment?.createdAt!)}</span>
                              </div>
                            </div>
                          );
                        })}
                      </>
                  }
                </>
            }
          </div>

        </div>
      }


    </div>
  );
};

export default CodeComponent;

CodeComponent.Skeleton = function () {
  return (
    <div className='w-full flex flex-col p-[1rem] bg-light-gray text-cool-gray-dark rounded-[6px] animate-pulse '>

      <div className='flex justify-start items-center gap-x-2 w-full'>
        <div className='w-[3rem] h-[3rem] bg-warm-gray-dark rounded-full' />
        <span className='w-24 h-4 bg-warm-gray-dark rounded ' />
      </div>

      <hr className='w-full h-[1px] bg-cool-gray-light border-none my-2 ' />


      <div className='w-full flex flex-col gap-y-4 '>
        <span className='w-full h-6 rounded bg-warm-gray-dark' />
        <div className='flex flex-col gap-2'>
          <span className='w-full h-4 bg-warm-gray-dark rounded' />
          <span className='w-full h-4 bg-warm-gray-dark rounded' />
          <span className='w-1/2 h-4 bg-warm-gray-dark rounded' />
        </div>
        <div className='flex gap-2'>
          <span className='w-10 h-5 bg-warm-gray-dark rounded' />
          <span className='w-10 h-5 bg-warm-gray-dark rounded' />
          <span className='w-10 h-5 bg-warm-gray-dark rounded' />
          <span className='w-10 h-5 bg-warm-gray-dark rounded' />
          <span className='w-10 h-5 bg-warm-gray-dark rounded' />
        </div>
      </div>

      <hr className='w-full h-[1px] bg-cool-gray-light border-none my-2 ' />

      <div className='flex flex-col items-center gap-y-2 '>
        <span className='w-full h-48 bg-warm-gray-dark rounded' />
        <div className='flex justify-end gap-2 w-full '>
          <span className="w-16 h-8 rounded bg-warm-gray-dark " />
          <span className="w-16 h-8 rounded bg-warm-gray-dark " />
          <span className="w-16 h-8 rounded bg-warm-gray-dark " />
        </div>
      </div>

    </div>
  )
}