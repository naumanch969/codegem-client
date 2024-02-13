import React, { ChangeEvent, useEffect, useState } from 'react';
import { Cancel, Close, Lock, ArrowDropDown, Clear } from '@mui/icons-material';
import TextareaAutosize from 'react-textarea-autosize';
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateStreak } from '../../redux/actions/streak';
import { RootState } from '../../redux/store';
import { Avatar } from '../../utils/Components';
import { Streak, User } from '../../interfaces';
import { image6 } from '../../assets';
import { useStateContext } from '../../contexts/ContextProvider';
import { useStreakModal } from '../../hooks/useStreakModal';

const UpdateStreak = ({ groupId, }: { groupId?: string, }) => {
    ////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////
    const { users, isFetching } = useSelector((state: RootState) => state.user);
    const { currentStreak } = useSelector((state: RootState) => state.streak)
    const { isOpen, onClose } = useStreakModal()
    const dispatch = useDispatch();

    const initialStreak: Streak = {
        title: '',
        description: '',
        streak: [{ description: '', code: '' }],
        tags: [],
        hashTags: [],
        likes: [],
        comments: [],
        shares: [],
        visibility: 'private',
    };

    ////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////
    const [streakData, setStreakData] = useState(currentStreak! || initialStreak);
    const [showVisibilityMenu, setShowVisibilityMenu] = useState(false);
    const [showTaggedModal, setShowTaggedModal] = useState(false);
    const [tagValue, setTagValue] = useState('');
    const [hashTagValue, setHashTagValue] = useState('');
    const [showhashTagModal, setShowhashTagModal] = useState(false);

    ////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////
    useEffect(() => {
        setStreakData(currentStreak!)
    }, [currentStreak])

    ////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////
    const handleUpdate = () => {
        let { title, description, tags, streak, visibility } = streakData;
        streak = streak.filter(item => item.code);
        if (!title || !description || streak.length == 0) return alert('Make sure to provide all the fields')
        const data = { title, description, tags, streak, visibility };
        if (groupId) {
            dispatch<any>(updateStreak(streakData?._id!, { ...data, groupId }, onClose));
        }
        else {
            dispatch<any>(updateStreak(streakData?._id!, data, onClose));
        }
        setStreakData(initialStreak)
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStreakData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const tagFriend = (friend: User) => {
        // Implement the logic for tagging friends
    };

    const filterTag = (tagToDelete: string) => {
        // Implement the logic for filtering tags
    };


    const handleFilterHashTag = (techToDelete: string) => {
        setStreakData({ ...streakData, hashTags: streakData?.hashTags.filter((t) => t !== techToDelete) });
    };

    const handleAddHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        const value: string = e.currentTarget.value;
        if (!value.trim()) return;
        setStreakData({ ...streakData, hashTags: [...streakData?.hashTags, value] });
        e.currentTarget.value = '';
        setHashTagValue('');
    };

    const addTag = (value: string) => {
        if (!value.trim()) return;

    };

    const HashTag: React.FC<{ title: string }> = ({ title }) => (
        <div className="flex gap-[8px] items-center justify-between rounded-[16px] py-[2px] px-[6px] bg-teal-blue  w-auto">
            <p className="text-white font-medium w-max text-[14px] ">{title}</p>
            <Clear
                onClick={() => handleFilterHashTag(title)}
                style={{ fontSize: '1rem' }}
                className={`cursor-pointer text-white text-[1rem] bg-lightGray  rounded-full `}
            />
        </div>
    );



    return (
        <>

            <Modal open={isOpen} onClose={onClose} className='flex justify-center items-center ' >
                <div className='bg-white w-[50vw] min-h-[20rem] h-fit max-h-[90vh] overflow-y-scroll rounded-[8px] p-[1rem] ' >

                    <div className='h-[12%] relative flex justify-center items-center pb-[12px] ' >
                        <h4 className='text-[22px] font-bold text-dark-slate-blue ' >Update Streak</h4>
                        <button onClick={onClose} className='absolute right-0 w-[2rem] h-[2rem] rounded-full bg-transparent ' ><Close className='text-cool-gray' /></button>
                    </div>

                    <hr className='h-[2px] w-full py-[12px] text-warm-gray  ' />

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
                                            <span className='text-[12px] font-medium ' >{streakData?.visibility}</span>
                                        </span>
                                        <ArrowDropDown />
                                    </button>
                                    {
                                        showVisibilityMenu &&
                                        <div className='w-full absolute top-full bg-white shadow-box flex flex-col items-start gap-[4px] rounded-b-[4px] ' >
                                            {
                                                menu.filter(m => m != streakData?.visibility).map((item, index) => (
                                                    <button key={index} onClick={() => { setShowVisibilityMenu(false); setStreakData({ ...streakData, visibility: item }) }} className='w-full gap-[2px] text-start hover:bg-teal-blue -lighten hover:text-white text-cool-gray capitalize p-[2px] ' >
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
                                <div className={`flex flex-col gap-[4px] w-[45%] `}  >
                                    <div className='flex flex-col justify-start gap-[4px] w-full  ' >
                                        <label htmlFor="title" className='flex-[1] text-cool-gray ' >Title:</label>
                                        <textarea
                                            name='title'
                                            rows={2}
                                            placeholder='Your title here....'
                                            value={streakData?.title}
                                            onChange={handleChange}
                                            className={`px-[4px] py-[2px] flex w-full outline-cool-gray bg-light-gray text-cool-gray border-cool-gray border-[1px] resize-none text-[16px] rounded-[4px] `}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-[4px] ">
                                        <h6 className={`capitalize w-full text-[16px] text-cool-gray  `}>Technologies:</h6>
                                        <div className={`${streakData?.hashTags.length && 'py-[8px] '} min-h-[54px] max-h-[12rem] overflow-y-scroll px-[8px] flex flex-wrap gap-[8px] w-full bg-light-gray text-cool-gray border-[1px] border-cool-gray rounded-[4px] `} >
                                            <input
                                                className="border-none resize-none h-[40px] py-[8px] bg-inherit outline-none text-[14px] text-cool-gray w-full rounded-[4px] "
                                                placeholder="Technologies - separated by enter"
                                                value={hashTagValue}
                                                onChange={(e) => setHashTagValue(e.target.value)}
                                                onKeyDown={handleAddHashTag}
                                            />
                                            {
                                                streakData?.hashTags.map((tech, index) => (
                                                    <HashTag title={tech} key={index} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[4px] w-[55%] ">
                                    <label htmlFor="description" className='flex-[1] text-cool-gray ' >Description<span className='text-[18px] text-teal-blue-darken ' >*</span> :</label>
                                    <textarea
                                        rows={4}
                                        name='description'
                                        placeholder='Write a short description of the streak?....'
                                        value={streakData?.description}
                                        onChange={handleChange}
                                        className={`h-full px-[4px] py-[2px] flex w-full outline-cool-gray bg-light-gray text-cool-gray border-cool-gray border-[1px] resize-none text-[16px] rounded-[4px] `}
                                    />
                                </div>
                            </div>

                            {/* streaks */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title" className='font-medium flex-[1] text-cool-gray ' >Streak<span className='text-[18px] text-teal-blue-darken ' >*</span> :</label>
                                <div className="flex flex-col gap-4">
                                    {
                                        streakData?.streak.map((item, index: number) => (
                                            <div key={index} className="flex flex-col gap-2 bg-gray-50 p-2 ">
                                                <div className='flex flex-col justify-start gap-[4px] ' >
                                                    <div className="flex justify-between items-center">
                                                        <label htmlFor="streak" className='flex-[1] text-cool-gray ' >Description:</label>
                                                        <button
                                                            onClick={() => {
                                                                setStreakData((pre: Streak) => ({
                                                                    ...pre,
                                                                    streak: pre.streak.filter((_, i: number) => i !== index)
                                                                }));
                                                            }}
                                                            className='hover:underline text-cool-gray text-sm '
                                                        >Remove</button>
                                                    </div>
                                                    <input
                                                        name='streak.description'
                                                        placeholder='Paste your streak here....'
                                                        value={item.description}
                                                        onChange={(e) => {
                                                            setStreakData((pre: Streak) => ({
                                                                ...pre,
                                                                streak: pre.streak.map((s, i) => i === index ? { ...s, description: e.target.value } : s)
                                                            }));
                                                        }}
                                                        className={`px-[4px] py-[2px] min-h-[44px] flex flex-[5] w-full outline-cool-gray bg-light-gray text-cool-gray border-cool-gray border-[1px] resize-none text-[16px] rounded-[4px] `}
                                                    />
                                                </div>
                                                <div className='flex flex-col justify-start gap-[4px] ' >
                                                    <label htmlFor="streak" className='flex-[1] text-cool-gray ' >Code:</label>
                                                    <TextareaAutosize
                                                        rows={2}
                                                        maxRows={5}
                                                        name='streak.code'
                                                        placeholder='Paste your streak here....'
                                                        value={item.code}
                                                        onChange={(e) => {
                                                            setStreakData((pre: Streak) => ({
                                                                ...pre,
                                                                streak: pre.streak.map((s, i) => i === index ? { ...s, code: e.target.value } : s)
                                                            }));
                                                        }}
                                                        className={`px-[4px] py-[2px] flex flex-[5] w-full outline-cool-gray bg-light-gray text-cool-gray border-cool-gray border-[1px] resize-none text-[16px] rounded-[4px] `}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                                <div className="flex justify-start items-center px-2 ">
                                    <button onClick={() => setStreakData((pre: Streak) => ({ ...pre, streak: [...pre.streak, { description: '', code: '' }] }))} className='hover:underline text-teal-blue ' >Add Snippet</button>
                                </div>
                            </div>

                            {/* buttons */}
                            <div className='flex flex-col gap-[8px] ' >
                                {/* streak button */}
                                <div className='flex justify-end ' >
                                    <button
                                        onClick={handleUpdate}
                                        disabled={!streakData?.streak}
                                        className={` ${!streakData?.streak ? 'cursor-not-allowed ' : 'cursor-pointer '}  w-[6rem] rounded-[4px] p-[4px] bg-teal-blue  text-white font-medium text-[18px] `} >
                                        {isFetching ? 'Creating...' : 'Update'}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </Modal >


            {/* showTaggedModal */}
            <Modal open={showTaggedModal} onClose={() => setShowTaggedModal(false)} className="flex justify-center items-center " >
                <div className="w-[20rem] h-[24rem] rounded-[8px] bg-neutral-800 " >
                    <div className="h-[24rem] p-[8px] " >
                        <h5 className="h-[10%] font-semibold " >Tag your friends:</h5>
                        <div className="h-[90%] flex flex-col gap-[8px] overflow-y-scroll " >
                            {
                                users.map((friend, index) => (
                                    <div key={index} onClick={() => tagFriend(friend)} className={`${Boolean(streakData?.tags) ? 'bg-gray-100' : ' '} flex justify-start items-center gap-[1rem] hover:bg-gray-100 cursor-pointer px-[8px] py-[4px] rounded-[8px] `} >
                                        <Avatar />
                                        <div className="flex flex-col justify-start " >
                                            <p className="text-[14px] font-medium " >{friend.email}</p>
                                            <p className="text-[14px] text-text-emerald " >{friend.username}</p>
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
                                streakData?.hashTags.map((hashTag, index) => (
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
                            onKeyDown={(e) => (e as React.KeyboardEvent<HTMLInputElement>).key === 'Enter' && addTag((e.target as HTMLInputElement).value)}
                            className={`outline-none w-full  p-[2px] rounded-[4px] bg-gray-100 `}
                        />
                    </div>
                </div>
            </Modal>


        </>
    )




}

export default UpdateStreak







const menu = [
    'private',
    'public',
    'friends only',
    'all friends except',
    'only share with',
]