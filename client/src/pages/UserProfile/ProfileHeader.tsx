import React from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../interfaces';
import { RootState } from '../../redux/store';
import { SampleProfileCoverImage } from '../../assets';

const ProfilePage = () => {

    const { currentUser }: { currentUser: User | null } = useSelector((state: RootState) => state.user)


    return (
        <div className="flex flex-col w-full">
            <div className="w-full h-[20rem] rounded-[6px] overflow-hidden " >
                <img
                    src={currentUser?.coverImage ? currentUser?.coverImage : SampleProfileCoverImage}
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
                                src={currentUser?.profilePicture ? currentUser?.profilePicture : "https://via.placeholder.com/50"}
                                className="w-full h-full object-cover rounded-full"
                                alt="Profile"
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-dark-slate-blue "><span className='capitalize' >{currentUser?.firstName} {currentUser?.lastName} </span>({currentUser?.username}) </h1>
                        <p className="text-gray-600">{currentUser?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
