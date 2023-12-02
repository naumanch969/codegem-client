import React, { useState } from 'react';
import { MoreVert, ThumbUpOutlined, Share, Comment, Save, CopyAll, Report, Delete, Update, ThumbUp, BookmarkBorderOutlined, Bookmark, CopyAllOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { image1 } from '../../assets';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { likeCode, saveCode } from '../../redux/actions/code';
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


const CodeComponent = ({ code }: { code: Code }) => {

  /////////////////////////////////////// VARIABLES ////////////////////////////////////////
  const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user);
  const { userCollections }: { userCollections: Collection[] } = useSelector((state: RootState) => state.collection);
  const savedCollection = userCollections.filter(collection => collection.name == 'Saved')
  const isCodeSaved = savedCollection[0]?.codes?.findIndex(c => c._id == code?._id) != -1
  const dispatch = useDispatch();


  /////////////////////////////////////// STATES ////////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [openShareModal, setOpenShareModal] = useState(false)
  const [openSaveModal, setOpenSaveModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  const [copy, setCopy] = useState(false);

  /////////////////////////////////////// FUNCTIONS ////////////////////////////////////////
  const handleLikeCode = () => {
    dispatch<any>(likeCode(code?._id as string));
  };
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code?.code);
    setShowMenu(false); // Close the menu after copying
  };
  const handleOpenUpdateModal = () => {
    setShowMenu(false);
    dispatch(getCodeReducer(code))
    setOpenUpdateModal(true)
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
    dispatch<any>(saveCode(code))
  }
  const hanldeCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 3000);
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
      <UpdateModal open={openUpdateModal} setOpen={setOpenUpdateModal} />
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
          <IconButton onClick={handleLikeCode}>
            {code?.likes?.includes(loggedUser?._id as string) ? <ThumbUp /> : <ThumbUpOutlined />}
          </IconButton>
          <span className='text-[14px]'>{code?.likes?.length} people</span>
        </div>
        <div className='flex gap-[4px]'>
          <IconButton onClick={() => setOpenShareModal(true)} className='relative'>
            <Share />
            <span className='w-[18px] h-[18px] rounded-full absolute top-0 right-0 flex justify-center items-center text-[12px] bg-teal-blue-lighten text-white'>{code?.shares?.length}</span>
          </IconButton>
          <IconButton onClick={handleSave} className='relative'>
            {
              isCodeSaved
                ?
                <Bookmark />
                :
                <BookmarkBorderOutlined />
            }
          </IconButton>
          <IconButton className='relative'>
            <Comment />
            <span className='w-[18px] h-[18px] rounded-full absolute top-0 right-0 flex justify-center items-center text-[12px] bg-teal-blue-lighten text-white'>{code?.comments?.length}</span>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CodeComponent;
