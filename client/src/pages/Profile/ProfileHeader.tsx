import React from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../interfaces';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { SampleProfileCoverImage } from '../../assets';
import { Button } from '@/components/ui/button';
import { MessageCircle, Pencil } from 'lucide-react';

const ProfilePage = () => {

    const navigate = useNavigate()
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)

    return (
        <div className="flex flex-col w-full">
            <div className="relative w-full h-[20rem] rounded-[6px] overflow-hidden " >
                {
                    loggedUser?.coverImage
                        ?
                        <img
                            src={loggedUser?.coverImage ? loggedUser?.coverImage : SampleProfileCoverImage}
                            alt=""
                            className="w-full h-full"
                        />
                        :
                        <div className="w-full h-full flex justify-end items-start p-4 bg-gradient-to-tr from-blackish-darken via-blackish to-copper-darken text-white border border-gray-100 rounded-md ">
                            <span className="text-4xl font-dancing-script ">{loggedUser?.firstName} {loggedUser?.lastName}</span>

                            {/* Upload icon here */}
                        </div>
                }
            </div>
            <div className="flex justify-between items-center gap-4 my-[1rem] px-[2rem] flex-[12]">
                {/* Profile image and username */}
                <div className="flex items-end justify-start gap-4 relative flex-[9]">
                    <div className="relative w-[10rem] ">
                        <div className="w-[10rem] h-[10rem] absolute bottom-[-1rem] rounded-full border-[1px] border-gray-500">
                            {
                                loggedUser?.profilePicture
                                    ?
                                    <img
                                        src={loggedUser?.profilePicture ? loggedUser?.profilePicture : "https://via.placeholder.com/50"}
                                        className="w-full h-full object-cover rounded-full"
                                        alt="Profile"
                                    />
                                    :
                                    <div className="font-dancing-script text-7xl flex justify-center items-center bg-gradient-to-tr from-blackish-darken via-blackish to-copper-darken w-full h-full rounded-full ">
                                        {loggedUser?.firstName.charAt(0)}{loggedUser?.lastName.charAt(0)}
                                    </div>
                            }
                        </div>
                    </div>
                    <div className='space-y-0.5' >
                        <h1 className="text-4xl font-bold text-blackish ">{loggedUser?.firstName} {loggedUser?.lastName}</h1>
                        <p className='flex-1 ' >{loggedUser?.title || 'Lorem, ipsum dolor si. Quas sint '}</p>
                        <p className="text-gray-600">{loggedUser?.username}</p>
                    </div>
                </div>
                {/* Edit profile button */}
                <div className="flex items-end gap-4 flex-[2]">
                    <Button onClick={() => navigate('/profile/edit')} variant='secondary' className='flex items-center gap-2' >
                        <MessageCircle className='w-4 h-4' /> Message
                    </Button>
                    <Button onClick={() => navigate('/profile/edit')} variant='outline' className='flex items-center gap-2' >
                        <Pencil className='w-4 h-4' /> Edit Profile
                    </Button>
                </div>
            </div>
        </div >
    );
};

export default ProfilePage;
