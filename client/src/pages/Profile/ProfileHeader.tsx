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

    const colors = [
        '#2E3A59',
        '#1D253B',
        '#445270',
        '#00A5B5',
        '#008C99',
        'linear-gradient(45deg,#2E3A59, #1D253B)',
        '#00BFC9',
        '#9B9B9B',
        '#7D7D7D',
        '#F5F5F5',
        '#000000',
        '#0f0f0f',
        'linear-gradient(45deg,#445270, #000, #fff)',
        'linear-gradient(45deg,#00A5B5, #008C99)',
        'linear-gradient(45deg,#00BFC9, #9B9B9B)',
        'linear-gradient(45deg,#F5F5F5, #000000)',
        'linear-gradient(45deg,#0f0f0f, #445270)',
        'linear-gradient(45deg,#445270, #000, #fff)',
        'linear-gradient(45deg,#2E3A59, #1D253B)',
        'linear-gradient(45deg,#00A5B5, #008C99)',
        'linear-gradient(45deg,#00BFC9, #9B9B9B)',
        'linear-gradient(45deg,#F5F5F5, #000000)',
        'linear-gradient(45deg,#0f0f0f, #445270)'
    ]

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
                        <div style={{ gridTemplateColumns: 'repeat(48, minmax(0, 1fr))', gridTemplateRows: 'repeat(24, minmax(0, 1fr))' }} className="absolute inset-0 grid grid-rows-6 gap-1 bg-black/70 bg-gray-50 border border-gray-100 rounded-md ">
                            {/* Grid lines */}
                            {Array.from({ length: 1152 }).map((_, index) => (
                                <div key={index} style={{ background: colors[index % colors.length] }} className="border border-dark-700 rounded-md"></div>
                            ))}
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
                                    <div className="font-dancing-script text-7xl flex justify-center items-center bg-gradient-to-r from-teal-blue-darken via-black to-dark-slate-blue w-full h-full rounded-full ">
                                        {loggedUser?.firstName.charAt(0)}{loggedUser?.lastName.charAt(0)}
                                    </div>
                            }
                        </div>
                    </div>
                    <div className='space-y-0.5' >
                        <h1 className="text-4xl font-bold text-dark-slate-blue ">{loggedUser?.firstName} {loggedUser?.lastName}</h1>
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
