import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Loader } from '../../utils/Components'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Upload } from '../../utils/Components/Upload';
import { User } from '../../interfaces';
import * as api from '../../redux/api';
import { updateProfile } from '../../redux/actions/user';

const ProfileEditPage: React.FC = () => {

    //////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { url, isFetching }: { url: string, isFetching: boolean } = useSelector((state: RootState) => state.general);
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const initialState = {
        _id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        profilePicture: '',
        coverImage: '',
        bio: '',
        title: '',
        socialLinks: [],
    }

    //////////////////////////////////////////////// STATES /////////////////////////////////////////////////////
    const [profileData, setProfileData] = useState<User>({ ...loggedUser! });
    const [bio, setBio] = useState<string>('');
    const [socialLinks, setSocialMedia] = useState<{ facebook: string, instagram: string, twitter: string, linkedin: string }>({ facebook: '', instagram: '', twitter: '', linkedin: '' });
    const [profilePicture, setProfilePicture] = useState<string>(loggedUser?.profilePicture! as string); // for frontend
    const [coverImage, setCoverImage] = useState<string>(loggedUser?.coverImage! as string); // for frontend - to show image 


    //////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////
    useEffect(() => {
        setProfileData({ ...profileData, profilePicture: url });
    }, [url]);

    //////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////
    const handleProfilePictureChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const fileUrl = URL.createObjectURL(e.target.files[0]);
            setProfileData({ ...profileData, profilePicture: e.target.files[0] });
            setProfilePicture(fileUrl)
        }
    };
    const handleProfilePictureClear = () => {
        setProfileData({ ...profileData, profilePicture: '' })
        setProfilePicture('')
    }
    const handleCoverImageChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const fileUrl = URL.createObjectURL(e.target.files[0]);
            setProfileData({ ...profileData, coverImage: e.target.files[0] });
            setCoverImage(fileUrl)
        }
    };
    const handleCoverImageClear = () => {
        setProfileData({ ...profileData, coverImage: '' })
        setCoverImage('')
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let coverImageUrl, profilePictureUrl;
        if ((profileData?.coverImage as { name: String })?.name) {
            const formData = new FormData();
            formData.append('image', profileData.coverImage as string);
            const { data } = await api.uploadImage(formData)
            coverImageUrl = data.result
        }
        if ((profileData?.coverImage as { name: String })?.name) {
            const formData = new FormData();
            formData.append('image', profileData.profilePicture as string);
            const { data } = await api.uploadImage(formData)
            profilePictureUrl = data.result
        }

        dispatch<any>(updateProfile({ ...profileData, coverImage: coverImageUrl, profilePicture: profilePictureUrl, socialLinks }))
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };
    const handleChangeSocialLinks = (name: string, value: string) => {
        setSocialMedia({ ...socialLinks, [name]: value })
    };


    return (
        <div className='w-full p-8 flex flex-col gap-4 ' >
            <div className="w-full h-[20rem] border bg-gray-200 rounded-[6px] overflow-hidden " >
                <Upload image={coverImage} handleFileChange={handleCoverImageChange} handleFileClear={handleCoverImageClear} />
            </div>
            <h1 className="text-3xl text-dark-slate-blue font-bold ">Edit Profile</h1>

            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-8 '  >
                    <div className="col-span-3 flex flex-col justify-start items-center gap-4 py-4 px-6 ">
                        <div className="w-48 h-48 border border-gray-500 rounded-full overflow-hidden ">
                            <Upload image={profilePicture} handleFileChange={handleProfilePictureChange} handleFileClear={handleProfilePictureClear} />
                        </div>
                        <div className="flex flex-col items-center ">
                            <h2 className='text-2xl font-medium text-dark-slate-blue-darken capitalize' >{loggedUser?.firstName} {loggedUser?.lastName}</h2>
                            <h3 className='text-xl font-medium text-dark-slate-blue-lighten ' >{loggedUser?.username}</h3>
                        </div>
                        <div className="flex flex-col items-center gap-4 ">
                            <h2 className='text-xl font-medium text-cool-gray-dark ' >Biography</h2>
                            <p className='text-sm text-center font-medium text-warm-gray-dark ' >{loggedUser?.bio || 'Your Bio here...'}</p>
                        </div>
                    </div>
                    <div className="flex flex-col col-span-5 gap-14 ">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4 w-full ">
                            <div className="col-span-2 flex flex-col justify-between items-start gap-4 w-full mb-4 ">
                                <div className="flex justify-between items-center w-full ">
                                    <h3 className='text-xl font-medium text-dark-slate-blue-darken ' >Basic Info</h3>
                                    <div className="flex justify-end items-center gap-2 ">
                                        <Button onClick={handleSubmit} type='secondary' variant='text' text='Cancel' loading={isFetching} disabled={isFetching} />
                                        <Button onClick={handleSubmit} type='secondary' variant='filled' text='Save' loading={isFetching} disabled={isFetching} />
                                    </div>
                                </div>
                                <hr className='w-full h-[2px] bg-gray-200 ' />
                            </div>
                            <div className='col-span-1 flex flex-col gap-1 ' >
                                <label htmlFor="firstName" className='text-sm text-dark-slate-blue ' >First Name</label>
                                <input
                                    id='firstName'
                                    className='border h-[40px] rounded-md px-4 w-full focus:outline-teal-blue '
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
                                    className='border h-[40px] rounded-md px-4 w-full focus:outline-teal-blue '
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
                                    className='border h-[40px] rounded-md px-4 w-full focus:outline-teal-blue '
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
                                    className='border h-[40px] rounded-md px-4 w-full focus:outline-teal-blue '
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
                                    className='border h-[40px] rounded-md px-4 w-full focus:outline-teal-blue '
                                    placeholder="i.e., Tech Enthusiastic, Gamer"
                                    value={profileData.title}
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
                                    className='resize-none border rounded-md px-4 py-2 w-full focus:outline-teal-blue '
                                    placeholder="Your bio here..."
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
                                    className='border h-[40px] rounded-md px-4 w-full focus:outline-teal-blue '
                                    placeholder="Facebook"
                                    value={socialLinks.facebook}
                                    onChange={(e) => handleChangeSocialLinks('facebook', e.target.value)}
                                    name="facebook"
                                    type="text"
                                />
                            </div>
                            <div className='w-full flex flex-col gap-1 ' >
                                <label htmlFor="twitter" className='text-sm text-dark-slate-blue ' >Twitter</label>
                                <input
                                    id='twitter'
                                    className='border h-[40px] rounded-md px-4 w-full focus:outline-teal-blue '
                                    placeholder="Twitter"
                                    value={socialLinks.twitter}
                                    onChange={(e) => handleChangeSocialLinks('twitter', e.target.value)}
                                    name="twitter"
                                    type="text"
                                />
                            </div>
                            <div className='w-full flex flex-col gap-1 ' >
                                <label htmlFor="instagram" className='text-sm text-dark-slate-blue ' >Instagram</label>
                                <input
                                    id='instagram'
                                    className='border h-[40px] rounded-md px-4 w-full focus:outline-teal-blue '
                                    placeholder="Instagram"
                                    value={socialLinks.instagram}
                                    onChange={(e) => handleChangeSocialLinks('instagram', e.target.value)}
                                    name="instagram"
                                    type="text"
                                />
                            </div>
                            <div className='w-full flex flex-col gap-1 ' >
                                <label htmlFor="linkedin" className='text-sm text-dark-slate-blue ' >Linkedin</label>
                                <input
                                    id='linkedin'
                                    className='border h-[40px] rounded-md px-4 w-full focus:outline-teal-blue '
                                    placeholder="Linkedin"
                                    value={socialLinks.linkedin}
                                    onChange={(e) => handleChangeSocialLinks('linkedin', e.target.value)}
                                    name="linkedin"
                                    type="text"
                                />
                            </div>
                        </div>
                        {/* External Links */}
                        {/* <div className="flex flex-col gap-4 w-full ">
                            <div className="flex flex-col justify-between items-start gap-4 w-full mb-4">
                                <h3 className='text-xl font-medium text-dark-slate-blue-darken ' >Security</h3>
                                <hr className='w-full h-[2px] bg-gray-200 ' />
                            </div>
                            <div className='w-full flex flex-col gap-1 ' >
                                <label htmlFor="password" className='text-sm text-dark-slate-blue ' >Password</label>
                                <input
                                    id='password'
                                    className='border h-[40px] rounded-md px-4 w-full focus:outline-teal-blue '
                                    placeholder="Password"
                                    value={'socialMedia.facebook'}
                                    onChange={(e) => { }}
                                    type="password"
                                />
                            </div>
                        </div> */}
                        {/* Button */}
                        <div className='flex justify-start items-center  ' >
                            <Button onClick={handleSubmit} type='secondary' text='Update' loading={isFetching} disabled={isFetching} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProfileEditPage;
