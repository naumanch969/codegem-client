import React, { useEffect, useState } from 'react';
import { MoreVert, ThumbUpOutlined, Share, Comment, Save, CopyAll, Report, Delete, Update, ThumbUp, BookmarkBorderOutlined, Bookmark, CopyAllOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { image1 } from '../../assets';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { commentChallenge, likeChallenge, saveChallenge } from '../../redux/actions/challenge';
import { format } from 'timeago.js'
import DeleteModal from './Delete';
import UpdateModal from './Update';
import { getChallengeReducer } from '../../redux/reducers/challenge';
import ShareChallenge from './ShareChallenge';
import { Challenge, Collection, User } from '../../interfaces';
import { RootState } from '../../redux/store';
import SaveChallenge from './SaveChallenge';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { getComments } from '../../redux/actions/comment';
import { Loader } from '../../utils/Components';
import { useChallengeModal } from '../../hooks/useChallengeModal';


const ChallengeComponent = ({ challenge }: { challenge: Challenge }) => {

  /////////////////////////////////////// VARIABLES ////////////////////////////////////////
  const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user);
  const { userCollections }: { userCollections: Collection[] } = useSelector((state: RootState) => state.collection);
  const savedCollection = userCollections.filter(collection => collection.name == 'Saved')
  const isChallengeSaved = savedCollection[0]?.challenges?.findIndex(c => c._id == challenge?._id) != -1
  const { isOpen, onOpen } = useChallengeModal()
  const dispatch = useDispatch();

  /////////////////////////////////////// STATES ////////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openShareModal, setOpenShareModal] = useState(false)
  const [openSaveModal, setOpenSaveModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  const [copy, setCopy] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [commentContent, setCommentContent] = useState<string>('')
  const [showComments, setShowComments] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  /////////////////////////////////////// USE EFFECT ////////////////////////////////////////
  useEffect(() => {
    if (!showComments) return
    if (challenge.comments.length == 0) return
    const refetch = challenge.comments.every(comment => typeof comment == 'string')
    if (refetch) {
      dispatch<any>(getComments(challenge?._id!, 'challenge', setCommentsLoading))
    }
  }, [showComments])

  /////////////////////////////////////// FUNCTIONS ////////////////////////////////////////
  const handleLikeChallenge = () => {
    dispatch<any>(likeChallenge(challenge?._id as string, loggedUser?._id as string));
    // TODO
    // if (isChallengeLiked) {
    //   challenge.likes = challenge?.likes?.filter((id) => id !== userId)
    // } else {
    //   challenge.likes = [...challenge?.likes!, userId!]
    // }
  };
  const handleCopyChallenge = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowMenu(false); // Close the menu after copying
  };
  const handleOpenUpdateModal = () => {
    setShowMenu(false);
    dispatch(getChallengeReducer(challenge))
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
    dispatch<any>(saveChallenge(challenge, isChallengeSaved ? 'unsave' : 'save'))
  }
  const hanldeCopy = (challenge: string) => {
    navigator.clipboard.writeText(challenge)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 3000);
  }
  const handleComment = () => {
    if (!commentContent) return
    dispatch<any>(commentChallenge(challenge?._id!, commentContent, loggedUser!))
    dispatch<any>(getComments(challenge?._id!, 'challenge', setCommentsLoading))
    setCommentContent('')
  }

  /////////////////////////////////////// COMPONENTS ////////////////////////////////////////
  const Menu = () => (
    <motion.div animate={{ x: [100, 0], opacity: [0, 1] }} className="absolute z-[50] shadow-box top-[3rem] items-start right-0 w-[15rem] h-auto flex flex-col gap-[4px] p-[8px] border-[2px] bg-white text-dark-slate-blue border-warm-gray-dark rounded-[4px]">
      <button onClick={handleOpenSaveModal} className="w-full flex hover:bg-cool-gray-light hover:bg-teal-blue-foreground/10 p-[6px] rounded-[6px] gap-2"><Save /><span className="">Save</span></button>
      {/* <button onClick={handleCopyChallenge} className="w-full flex hover:bg-cool-gray-light hover:bg-teal-blue-foreground/10 p-[6px] rounded-[6px] gap-2"><CopyAll /><span className="">Copy</span></button> */}
      {/* String(loggedUser._id) == String(challenge?.user) && */}
      {
        <>
          <button onClick={handleOpenUpdateModal} className="w-full flex hover:bg-cool-gray-light hover:bg-teal-blue-foreground/10 p-[6px] rounded-[6px] gap-2"><Update /><span className="">Update</span></button>
          <button onClick={handleOpenDeleteModal} className="w-full flex hover:bg-cool-gray-light hover:bg-teal-blue-foreground/10 p-[6px] rounded-[6px] gap-2"><Delete /><span className="">Delete</span></button>
        </>
      }
      <button onClick={() => { setShowMenu(false) }} className="w-full flex hover:bg-cool-gray-light hover:bg-teal-blue-foreground/10 p-[6px] rounded-[6px] gap-2"><Report /><span className="">Report</span></button>
    </motion.div>
  );

  return (
    <div className='w-full flex flex-col p-[1rem] bg-light-gray text-cool-gray-dark rounded-[6px]'>

      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} challengeId={challenge?._id as string} />
      {openShareModal && <ShareChallenge open={openShareModal} setOpen={setOpenShareModal} challenge={challenge} />}
      {openSaveModal && <SaveChallenge open={openSaveModal} setOpen={setOpenSaveModal} challenge={challenge} />}

      {/* username */}
      <div className='flex justify-between items-center'>
        <div className='flex gap-[1rem]'>
          <div className='w-[3rem] h-[3rem] rounded-full'>
            <img src={image1} alt="image" className='w-full h-full rounded-full object-cover' />
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h5 className='text-[14px] font-semibold capitalize '>{challenge?.user?.firstName} {challenge?.user?.lastName}</h5>
            <p className='text-[12px] font-light '>{challenge?.user?.username}</p>
          </div>
          <div className='flex items-center'>
            <span className='text-teal-blue text-[14px] '>{format(challenge?.createdAt as Date)}</span>
          </div>
        </div>
        <div className="relative">
          <IconButton onClick={() => setShowMenu(prev => !prev)} className="bg-teal-blue  cursor-pointer capitalize text-black"><MoreVert /></IconButton>
          {showMenu && <Menu />}
        </div>
      </div>

      <hr className='w-full h-[1px] bg-cool-gray-light border-none mt-[6px] mb-[6px]' />

      <div className='flex flex-col gap-[8px]'>
        {/* title, description, tags */}
        <div className='flex flex-col gap-[2px]'>
          <h3 className='font-semibold text-[20px] capitalize text-warm-gray-dark ' >{challenge?.title}</h3>
          <p className='text-[14px]'>{challenge?.description}</p>
          <div className='flex gap-[6px]'>
            {
              challenge?.tags?.map((tag, index) => (
                <span key={index} className='text-teal-blue italic hover:underline cursor-pointer lowercase '>#{tag.name}</span>
              ))
            }
          </div>
        </div>
        {/* challenge */}
        <div className="flex flex-col gap-2">
          <div className='relative rounded-[8px] text-[14px] bg-cool-gray-dark p-3 '>
            <p className='text-white text-[18px] font-base ' >{challenge.challenge}</p>
            <div className="relative">
              {
                showSolution &&
                <>
                  {
                    copy
                      ?
                      <button className='absolute right-4 top-2 w-16 h-8 rounded-full text-white ' >Copied!</button>
                      :
                      <Tooltip placement='top-start' title='Copy' className='absolute right-4 top-2'  ><button onClick={() => hanldeCopy(challenge?.solution)} className='w-8 h-8 rounded-full ' ><CopyAllOutlined className='text-white' /></button></Tooltip>
                  }
                  <SyntaxHighlighter
                    style={atomOneDark}
                    language="javascript"
                    wrapLongLines={true}
                    customStyle={{ borderRadius: '8px', padding: '12px', maxHeight: '22rem' }}
                  >
                    {challenge?.solution}
                  </SyntaxHighlighter>
                </>
              }
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button onClick={() => setShowSolution((pre: boolean) => !pre)} className='hover:underline text-teal-blue text-sm '>{showSolution ? 'Hide' : 'Show'} Solution</button>
        </div>
      </div>

      <hr className='w-full h-[1px] bg-cool-gray-light border-none mb-[6px] mt-[6px]' />

      {/* likes, share, comments */}
      <div className='flex justify-between items-center'>
        <div>
          <IconButton onClick={handleLikeChallenge}>
            {/* TODO: remove never from below */}
            {challenge?.likes?.includes(loggedUser?._id! as never) ? <ThumbUp /> : <ThumbUpOutlined />}
          </IconButton>
          <span className='text-[14px]'>{challenge?.likes?.length} people</span>
        </div>
        <div className='flex gap-[4px]'>
          <IconButton onClick={() => setOpenShareModal(true)} className='relative'>
            <Share />
            <span className='w-[18px] h-[18px] rounded-full absolute top-0 right-0 flex justify-center items-center text-[12px] bg-teal-blue -lighten text-white'>{challenge?.shares?.length}</span>
          </IconButton>
          <IconButton onClick={handleSave} className='relative'>
            {
              isChallengeSaved
                ?
                <Bookmark />
                :
                <BookmarkBorderOutlined />
            }
          </IconButton>
          <IconButton onClick={() => setShowComments((pre) => !pre)} className='relative'>
            <Comment />
            <span className='w-[18px] h-[18px] rounded-full absolute top-0 right-0 flex justify-center items-center text-[12px] bg-teal-blue -lighten text-white'>{challenge?.comments?.length}</span>
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


          <div className='space-y-2 h-full'>
            {
              commentsLoading
                ?
                <div className='flex justify-center items-center h-full' >
                  <Loader />
                </div>
                :
                <>
                  {
                    challenge.comments.length == 0
                      ?
                      <div className="flex justify-center items-center w-full h-full ">
                        <span className=''>No Comments to Show.</span>
                      </div>
                      :
                      <>
                        {challenge?.comments?.map((comment, index) => {
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

export default ChallengeComponent;


ChallengeComponent.Skeleton = function () {
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