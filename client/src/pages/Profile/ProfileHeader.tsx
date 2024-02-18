import React from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../interfaces';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { SampleProfileCoverImage } from '../../assets';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

const ProfilePage = () => {

    const navigate = useNavigate()
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)


    return (
        <div className="flex flex-col w-full">
            <div className="w-full h-[20rem] rounded-[6px] overflow-hidden " >
                <img
                    src={loggedUser?.coverImage ? loggedUser?.coverImage : SampleProfileCoverImage}
                    alt=""
                    className="w-full h-full"
                />
            </div>
            <div className="flex justify-between items-center gap-4 my-[1rem] px-[2rem]">
                {/* Profile image and username */}
                <div className="flex items-end gap-[1rem] relative">
                    <div className="relative w-[10rem]">
                        <div className="w-[10rem] h-[10rem] absolute bottom-[-1rem] rounded-full border-[1px] border-gray-500">
                            <img
                                src={loggedUser?.profilePicture ? loggedUser?.profilePicture : "https://via.placeholder.com/50"}
                                className="w-full h-full object-cover rounded-full"
                                alt="Profile"
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-dark-slate-blue "><span className='capitalize' >{loggedUser?.firstName} {loggedUser?.lastName} </span>({loggedUser?.username}) </h1>
                        <p className="text-gray-600">{loggedUser?.email}</p>
                    </div>
                </div>
                {/* Edit profile button */}
                <div className="flex items-end gap-[1rem]">
                    <Button onClick={() => navigate('/profile/edit')} variant='outline' className='flex items-center gap-2' >
                        <Pencil className='w-4 h-4' /> Edit Profile
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
