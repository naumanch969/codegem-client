import React, { useState } from 'react';
import { MoreVert, ThumbUpOutlined, Share, Comment, Save, CopyAll, Favorite, Report, Delete, Update } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { image1 } from '../../assets';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { likeCode } from '../../redux/actions/code';
import { format } from 'timeago.js'
import DeleteModal from './Delete';
import UpdateModal from './Update';
import { getCodeReducer, updateCodeReducer } from '../../redux/reducers/code';

const Code = ({ code }) => {

  /////////////////////////////////////// VARIABLES ////////////////////////////////////////
  const { loggedUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  /////////////////////////////////////// STATES ////////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false);

  /////////////////////////////////////// FUNCTIONS ////////////////////////////////////////
  const handleLikeCode = () => {
    dispatch(likeCode(code?._id));
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
  const handleOpenDeleteModal = () => {
    setShowMenu(false);
    setOpenDeleteModal(true)
  }

  /////////////////////////////////////// COMPONENTS ////////////////////////////////////////
  const Menu = () => (
    <motion.div animate={{ x: [100, 0], opacity: [0, 1] }} className="absolute z-[50] shadow-box top-[3rem] items-start right-0 w-[15rem] h-auto flex flex-col gap-[4px] p-[8px] border-[2px] bg-white text-dark-slate-blue border-warm-gray-dark rounded-[4px]">
      <button onClick={() => { setShowMenu(false) }} className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-[6px] gap-2"><Save /><span className="">Save</span></button>
      <button onClick={handleCopyCode} className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-[6px] gap-2"><CopyAll /><span className="">Copy</span></button>
      {/* String(loggedUser._id) == String(code.user) && */}
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
    <div className='w-full flex flex-col p-[1rem] bg-light-gray text-cool-gray rounded-[6px]'>

      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} codeId={code?._id} />
      <UpdateModal open={openUpdateModal} setOpen={setOpenUpdateModal} />

      {/* username */}
      <div className='flex justify-between items-center'>
        <div className='flex gap-[1rem]'>
          <div className='w-[3rem] h-[3rem] rounded-full'>
            <img src={image1} alt="image" className='w-full h-full rounded-full object-cover' />
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h5 className='text-[14px] font-semibold'>{code?.username}</h5>
            <p className='text-[12px] font-light'>{code?.username}</p>
          </div>
          <div className='flex items-center'>
            <span className='text-teal-blue text-[14px] '>{format(code?.createdAt)}</span>
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
          <h3 className='font-semibold text-[20px]'>{code?.title}</h3>
          <p className='text-[14px]'>{code?.description}</p>
          <div className='flex gap-[6px]'>
            {
              code?.tags.map((tag, index) => (
                <span key={index} className='text-teal-blue italic hover:underline cursor-pointer lowercase '>#{tag}</span>
              ))
            }
          </div>
        </div>
        {/* code */}
        <div className='rounded-[4px] p-[8px] bg-dark-slate-blue text-white'>
          <code>
            {code?.code}
          </code>
        </div>
      </div>

      <hr className='w-full h-[1px] bg-cool-gray-light border-none mb-[6px] mt-[6px]' />

      {/* likes, share, comments */}
      <div className='flex justify-between items-center'>
        <div>
          <IconButton onClick={handleLikeCode}> <ThumbUpOutlined /> </IconButton>
          <span className='text-[14px]'>{code?.likes?.length} people</span>
        </div>
        <div className='flex gap-[4px]'>
          <IconButton className='relative'>
            <Share />
            <span className='w-[18px] h-[18px] rounded-full absolute top-0 right-0 flex justify-center items-center text-[12px] bg-teal-blue-lighten text-white'>{code?.shares?.length}</span>
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

export default Code;
