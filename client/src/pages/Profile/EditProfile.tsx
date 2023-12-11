import React, { ChangeEvent, useEffect, useState } from 'react';
import {
    TextField,
    InputAdornment,
    Button,
    Select,
    MenuItem,
} from '@mui/material';
import { PageHeading } from '../../utils/Components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Upload } from '../../utils/Components/Upload';

const ProfileEditPage: React.FC = () => {

    //////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////
    const { url, isFetching }: { url: string, isFetching: boolean } = useSelector((state: RootState) => state.general);
    const initialState = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        profilePicture: '',
    };

    //////////////////////////////////////////////// STATES /////////////////////////////////////////////////////
    const [profileData, setProfileData] = useState(initialState);
    const [bio, setBio] = useState<string>('');
    const [socialMedia, setSocialMedia] = useState<{ facebook: string, instagram: string, twitter: string, linkedin: string }>({ facebook: '', instagram: '', twitter: '', linkedin: '' });
    const [interests, setInterests] = useState<string[]>([]);

    //////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////
    useEffect(() => {
        setProfileData({ ...profileData, profilePicture: url });
    }, [url]);

    //////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // Implement your logic for handling image changes
        }
    };

    const handleInterestsChange = (e: any) => {
        setInterests(e.target.value as string[]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement your logic for handling form submission
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    return (
        <div className='w-full p-8 flex flex-col gap-4 ' >
            <div className="w-full h-[20rem] rounded-[6px] overflow-hidden " >
                <img src="https://via.placeholder.com/50" alt="" className="w-full h-full" />
            </div>
            <h1 className="text-3xl text-dark-slate-blue font-bold ">Edit Profile</h1>

            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-8 '  >
                    <div className="col-span-3 flex flex-col justify-start items-center gap-4 py-4 px-6 ">
                        <div className="w-48 h-48 border border-gray-500 rounded-full ">
                            <Upload image={profileData.profilePicture} />
                        </div>
                        <div className="flex flex-col items-center ">
                            <h2 className='text-2xl font-medium text-dark-slate-blue-darken ' >Ali Asjad</h2>
                            <h3 className='text-xl font-medium text-dark-slate-blue-lighten ' >username</h3>
                        </div>
                        <div className="flex flex-col items-center gap-4 ">
                            <h2 className='text-xl font-medium text-cool-gray-dark ' >Biography</h2>
                            <p className='text-sm text-center font-medium text-warm-gray-dark ' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias atque in sed earum mollitia aliquid optio, nihil voluptate minus nobis rem placeat dicta.</p>
                        </div>
                    </div>
                    <div className="flex flex-col col-span-5 gap-14 ">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4 w-full ">
                            <div className="col-span-2 flex flex-col justify-between items-start gap-4 w-full mb-4 ">
                                <div className="flex justify-between items-center w-full ">
                                    <h3 className='text-xl font-medium text-dark-slate-blue-darken ' >Basic Info</h3>
                                    <div className="flex justify-end items-center gap-2 ">
                                        <button onClick={() => { }} className='text-teal-blue bg-white hover:bg-light-gray text-[16px] px-[10px] py-[5px] rounded-[4px] ' >
                                            Cancel
                                        </button>
                                        <button onClick={() => { }} className='bg-teal-blue text-white hover:bg-teal-blue-darken text-[16px] px-[10px] py-[5px] rounded-[4px] ' >
                                            {isFetching ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                </div>
                                <hr className='w-full h-[2px] bg-gray-200 ' />
                            </div>
                            <div className='col-span-1 flex flex-col gap-1 ' >
                                <label htmlFor="firstName" className='text-sm text-dark-slate-blue ' >First Name</label>
                                <input
                                    id='firstName'
                                    className='border h-[40px] rounded-md px-4 w-full '
                                    placeholder="First Name"
                                    value={profileData.firstName}
                                    onChange={handleChange}
                                    name="firstName"
                                    type="text"
                                />
                            </div>
                            <div className='col-span-1 flex flex-col gap-1 ' >
                                <label htmlFor="lastName" className='text-sm text-dark-slate-blue ' >Last Name</label>
                                <input
                                    id='lastName'
                                    className='border h-[40px] rounded-md px-4 w-full '
                                    placeholder="Last Name"
                                    value={profileData.lastName}
                                    onChange={handleChange}
                                    name="lastName"
                                    type="text"
                                />
                            </div>
                            <div className='col-span-1 flex flex-col gap-1 ' >
                                <label htmlFor="username" className='text-sm text-dark-slate-blue ' >Username</label>
                                <input
                                    id='username'
                                    className='border h-[40px] rounded-md px-4 w-full '
                                    placeholder="Username"
                                    value={profileData.username}
                                    onChange={handleChange}
                                    name="username"
                                    type="text"
                                />
                            </div>
                            <div className='col-span-1 flex flex-col gap-1 ' >
                                <label htmlFor="email" className='text-sm text-dark-slate-blue ' >Email</label>
                                <input
                                    id='email'
                                    className='border h-[40px] rounded-md px-4 w-full '
                                    placeholder="Email"
                                    value={profileData.email}
                                    onChange={handleChange}
                                    name="email"
                                    type="text"
                                />
                            </div>
                            <div className='col-span-2 flex flex-col gap-1 ' >
                                <label htmlFor="title" className='text-sm text-dark-slate-blue ' >Title</label>
                                <input
                                    id='title'
                                    className='border h-[40px] rounded-md px-4 w-full '
                                    placeholder="Title"
                                    value={profileData.email}
                                    onChange={handleChange}
                                    name="title"
                                    type="text"
                                />
                            </div>
                        </div>
                        {/* About Me */}
                        <div className="flex flex-col gap-4 w-full ">
                            <div className="flex flex-col justify-between items-start gap-4 w-full mb-4 ">
                                <h3 className='text-xl font-medium text-dark-slate-blue-darken ' >About Me</h3>
                                <hr className='w-full h-[2px] bg-gray-200 ' />
                            </div>
                            <div className='w-full flex flex-col gap-1 ' >
                                <label htmlFor="bio" className='text-sm text-dark-slate-blue ' >Bio</label>
                                <textarea
                                    id='bio'
                                    className='resize-none border rounded-md px-4 py-2 w-full '
                                    placeholder="Bio"
                                    rows={4}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* External Links */}
                        <div className="flex flex-col gap-4 w-full ">
                            <div className="flex flex-col justify-between items-start gap-4 w-full mb-4">
                                <h3 className='text-xl font-medium text-dark-slate-blue-darken ' >External Links</h3>
                                <hr className='w-full h-[2px] bg-gray-200 ' />
                            </div>
                            <div className='w-full flex flex-col gap-1 ' >
                                <label htmlFor="facebook" className='text-sm text-dark-slate-blue ' >Facebook</label>
                                <input
                                    id='facebook'
                                    className='border h-[40px] rounded-md px-4 w-full '
                                    placeholder="Facebook"
                                    value={socialMedia.facebook}
                                    onChange={(e) => setSocialMedia({ ...socialMedia, facebook: e.target.value })}
                                    name="facebook"
                                    type="text"
                                />
                            </div>
                            <div className='w-full flex flex-col gap-1 ' >
                                <label htmlFor="twitter" className='text-sm text-dark-slate-blue ' >Twitter</label>
                                <input
                                    id='twitter'
                                    className='border h-[40px] rounded-md px-4 w-full '
                                    placeholder="Twitter"
                                    value={socialMedia.twitter}
                                    onChange={(e) => setSocialMedia({ ...socialMedia, twitter: e.target.value })}
                                    name="twitter"
                                    type="text"
                                />
                            </div>
                            <div className='w-full flex flex-col gap-1 ' >
                                <label htmlFor="instagram" className='text-sm text-dark-slate-blue ' >Instagram</label>
                                <input
                                    id='instagram'
                                    className='border h-[40px] rounded-md px-4 w-full '
                                    placeholder="Instagram"
                                    value={socialMedia.instagram}
                                    onChange={(e) => setSocialMedia({ ...socialMedia, instagram: e.target.value })}
                                    name="instagram"
                                    type="text"
                                />
                            </div>
                            <div className='w-full flex flex-col gap-1 ' >
                                <label htmlFor="linkedin" className='text-sm text-dark-slate-blue ' >Linkedin</label>
                                <input
                                    id='linkedin'
                                    className='border h-[40px] rounded-md px-4 w-full '
                                    placeholder="Linkedin"
                                    value={socialMedia.linkedin}
                                    onChange={(e) => setSocialMedia({ ...socialMedia, linkedin: e.target.value })}
                                    name="linkedin"
                                    type="text"
                                />
                            </div>
                        </div>
                        {/* External Links */}
                        <div className="flex flex-col gap-4 w-full ">
                            <div className="flex flex-col justify-between items-start gap-4 w-full mb-4">
                                <h3 className='text-xl font-medium text-dark-slate-blue-darken ' >Security</h3>
                                <hr className='w-full h-[2px] bg-gray-200 ' />
                            </div>
                            <div className='w-full flex flex-col gap-1 ' >
                                <label htmlFor="password" className='text-sm text-dark-slate-blue ' >Password</label>
                                <input
                                    id='password'
                                    className='border h-[40px] rounded-md px-4 w-full '
                                    placeholder="Password"
                                    value={'socialMedia.facebook'}
                                    onChange={(e) => { }}
                                    type="password"
                                />
                            </div>
                        </div>
                        {/* Button */}
                        <div className='flex justify-start items-center  ' >
                            <button onClick={() => { }} className='bg-teal-blue text-white hover:bg-teal-blue-darken text-[16px] px-[10px] py-[5px] rounded-[4px] ' >
                                {isFetching ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProfileEditPage;
