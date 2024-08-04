import React, { useEffect, useState } from 'react';
import { MoreVert, ThumbUpOutlined, Share, Comment, Save, CopyAll, Delete, Update, ThumbUp, BookmarkBorderOutlined, Bookmark, CopyAllOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { commentCode, likeCode, saveCode } from '../../redux/actions/code';
import { format } from 'timeago.js'
import DeleteModal from './Delete';
import ShareCode from './ShareCode';
import { Code, Collection, User } from '../../interfaces';
import { RootState } from '../../redux/store';
import SaveCode from './SaveCode';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { getComments } from '../../redux/reducers/comment';
import { Loader } from '../../utils/Components';
import { useCodeModal } from '../../hooks/useCodeModal';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';


const CodeComponent = ({ code }: { code: Code }) => {

  /////////////////////////////////////// VARIABLES ////////////////////////////////////////
  const { onOpen, onSetCode, onSetCollectionId, onSetGroupId } = useCodeModal()
  const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user);
  const { userCollections }: { userCollections: Collection[] } = useSelector((state: RootState) => state.collection);
  const savedCollection = userCollections.filter(collection => collection.name == 'Saved')
  const userId = loggedUser?._id
  const isCodeSaved = savedCollection[0]?.codes?.findIndex(c => c._id == code?._id) != -1
  const dispatch = useDispatch();

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
      setCommentsLoading(true)
      dispatch<any>(getComments({ postId: code?._id!, postType: 'code' })).finally(() => setCommentsLoading(false))
    }
  }, [showComments])



  /////////////////////////////////////// FUNCTIONS ////////////////////////////////////////
  const handleLikeCode = () => {
    dispatch<any>(likeCode(code?._id as string, userId!, code?.group));
  };
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code?.code);
    setShowMenu(false); // Close the menu after copying
  };
  const handleOpenUpdateModal = () => {
    setShowMenu(false);
    onSetCode(code)
    onOpen()
    onSetCollectionId('')
    onSetGroupId('')
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
    dispatch<any>(getComments({ postId: code?._id!, postType: 'code' }))
    setCommentContent('')
  }

  return (
    <>
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} codeId={code?._id as string} />
      {openShareModal && <ShareCode open={openShareModal} setOpen={setOpenShareModal} code={code} />}
      {openSaveModal && <SaveCode open={openSaveModal} setOpen={setOpenSaveModal} code={code} />}

      <Card className='w-full flex flex-col bg-copper-gray-light text-cool-gray-dark'>

        {/* username */}
        <CardHeader className='flex flex-row justify-between items-center w-full px-4 py-3 pb-2 '>
          <div className='flex gap-4'>
            <Avatar>
              <AvatarImage src={code?.user?.profilePicture} alt="Profile" />
              <AvatarFallback className='capitalize bg-blackish text-white' >{code?.user?.firstName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className='flex flex-col items-start justify-center'>
              <Link to={`/user/${code?.user?._id}`} className='text-sm font-semibold capitalize hover:underline hover:text-copper'>
                {code?.user?.firstName} {code?.user?.lastName}
              </Link>
              <p className='text-xs font-light '>{code?.user?.username}</p>
            </CardTitle>
            <div className='flex items-center'>
              <span className='text-copper text-[14px] '>{format(code?.createdAt as Date)}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IconButton><MoreVert /></IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className='cursor-pointer flex gap-x-1' onClick={handleOpenSaveModal} ><Save />Save</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer flex gap-x-1' onClick={handleCopyCode}  ><CopyAll />Copy</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer flex gap-x-1' onClick={handleOpenUpdateModal} ><Update />Update</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer flex gap-x-1' onClick={handleOpenDeleteModal} ><Delete />Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <Separator className='w-full h-[1px] bg-cool-gray-light border-none mt-[6px] mb-[6px]' />

        <CardContent className='flex flex-col gap-[8px] p-4 pb-2 pt-2'>
          {/* title, description, tags */}
          <div className='flex flex-col gap-[2px]'>
            <h3 className='font-semibold text-[20px] capitalize text-blackish-darken '>{code?.title}</h3>
            <CardDescription className='text-[14px]'>{code?.description}</CardDescription>
            <div className='flex gap-1.5 my-1'>
              {code?.language && <span className='text-copper italic hover:underline cursor-pointer lowercase '>#{code?.language}</span>}
              {
                code?.hashTags?.map((tag, index) => (
                  <span key={index} className='text-link-blue italic hover:underline hover:text-blackish-darken cursor-pointer lowercase '>#{tag}</span>
                ))
              }
            </div>
          </div>
          {/* code */}
          <div className='relative rounded-md overflow-hidden text-sm bg-cool-gray-dark '>
            <div className="absolute top-2 right-2">
              {
                copy
                  ?
                  <button className='w-16 h-8 rounded-full text-white ' >Copied!</button>
                  :
                  <Tooltip placement='top-start' title='Copy'  >
                    <button title='copy' onClick={() => hanldeCopy(code?.code)} className='w-8 h-8 rounded-full ' >
                      <CopyAllOutlined className='text-white' />
                    </button>
                  </Tooltip>
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
        </CardContent>

        <Separator className='w-full h-[1px] bg-cool-gray-light border-none mb-1 mt-1' />
        {/* likes, share, comments */}
        <CardFooter className={`flex justify-between items-center px-4 pt-1 ${showComments ? 'pb-0' : 'pb-2'} `}>
          <div>
            <IconButton onClick={handleLikeCode} size='medium' >
              {code?.likes?.includes(loggedUser?._id as string) ? <ThumbUp fontSize="inherit" /> : <ThumbUpOutlined fontSize="inherit" />}
            </IconButton>
            <span className='text-[14px]'>{code?.likes?.length} people</span>
          </div>
          <div className='flex gap-[4px]'>
            <IconButton onClick={() => setOpenShareModal(true)} size='medium' className='relative'>
              <Share fontSize="inherit" />
              <span className='w-[18px] h-[18px] rounded-full absolute top-0 right-0 flex justify-center items-center text-[12px] bg-copper-lighten text-white'>
                {code?.shares?.length}
              </span>
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
              <span className='w-[18px] h-[18px] rounded-full absolute top-0 right-0 flex justify-center items-center text-[12px] bg-copper-lighten text-white'>{code?.comments?.length}</span>
            </IconButton>
          </div>
        </CardFooter>

        {/* Comment Section */}
        {
          showComments &&
          <div className="flex flex-col mt-4 min-h-[8rem] max-h-[16rem] overflow-auto px-4 pb-2 pt-1 ">
            <div className='flex items-center space-x-3 mb-2'>
              <Avatar>
                <AvatarImage src={loggedUser?.profilePicture} alt="Profile" />
                <AvatarFallback>{loggedUser?.firstName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <Input
                type="text"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 p-2 border rounded-lg "
              />
              <Button size='sm' onClick={handleComment} >Send</Button>
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
                                <Avatar className='w-8 h-8' >
                                  <AvatarImage src={(comment?.user as User)?.profilePicture} alt="Profile" className='w-8 h-8' />
                                  <AvatarFallback>{(comment?.user as User)?.firstName?.charAt(0)}</AvatarFallback>
                                </Avatar>
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


      </Card>
    </>
  );
};

export default CodeComponent;

CodeComponent.Skeleton = function () {
  return (
    <div className='w-full flex flex-col p-4 bg-light-gray text-cool-gray-dark rounded-[6px] animate-pulse '>

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