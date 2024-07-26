import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Upload } from '../../utils/Components/Upload';
import { User } from '../../interfaces';
import * as api from '../../redux/api';
import { updateProfile } from '@/redux/reducers/userSlice';
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import toast from 'react-hot-toast';
import { Separator } from '@/components/ui/separator';


const ProfileEditPage: React.FC = () => {

    // <---------------------------------------------------- VARIABLES ----------------------------------------------------------->
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)

    const formSchema = z.object({
        firstName: z.string().min(1, { message: 'Title is required.' }).max(250, { message: 'Title can\' be longer than 250 characters.' }),
        lastName: z.string().min(1, { message: 'Title is required.' }).max(250, { message: 'Title can\' be longer than 250 characters.' }),
        username: z.string().min(1, { message: 'Title is required.' }).max(250, { message: 'Title can\' be longer than 250 characters.' }),
        email: z.string().min(1, { message: 'Title is required.' }).max(250, { message: 'Title can\' be longer than 250 characters.' }),
        title: z.string().min(1, { message: 'Title is required.' }).max(250, { message: 'Title can\' be longer than 250 characters.' }),
        bio: z.string().min(1, { message: 'Title is required.' }).max(250, { message: 'Title can\' be longer than 250 characters.' }),
        externalLinks: z.object({ facebook: z.string(), twitter: z.string(), instagram: z.string(), linkedin: z.string(), github: z.string() })
    })

    const initialData: z.infer<typeof formSchema> = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        title: "",
        bio: "",
        externalLinks: { facebook: '', twitter: '', instagram: '', linkedin: '', github: '' },
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: loggedUser! || initialData,
    })
    const dispatch = useDispatch();


    const { url, isFetching }: { url: string, isFetching: boolean } = useSelector((state: RootState) => state.general);

    // <---------------------------------------------------- FUNCTIONS ----------------------------------------------------------->
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // form.reset(initialData);
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
        if (profileData?.coverImage) {
            const formData = new FormData();
            formData.append('image', profileData.coverImage as string);
            const { data } = await api.uploadImage(formData)
            coverImageUrl = data.result
        }
        if (profileData?.coverImage) {
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-8 flex flex-col gap-4 ">
                <div className="w-full h-[20rem] border bg-gray-200 rounded-[6px] overflow-hidden " >
                    <Upload image={coverImage} handleFileChange={handleCoverImageChange} handleFileClear={handleCoverImageClear} />
                </div>
                <h1 className="text-3xl text-blackish font-bold ">Edit Profile</h1>
                <div className='grid grid-cols-8 '  >
                    <div className="col-span-3 flex flex-col justify-start items-center gap-4 py-4 px-6 ">
                        <div className="w-48 h-48 border border-gray-500 rounded-full overflow-hidden ">
                            <Upload image={profilePicture} handleFileChange={handleProfilePictureChange} handleFileClear={handleProfilePictureClear} />
                        </div>
                        <div className="flex flex-col items-center ">
                            <h2 className='text-2xl font-medium text-blackish-darken capitalize' >{loggedUser?.firstName} {loggedUser?.lastName}</h2>
                            <h3 className='text-xl font-medium text-blackish-lighten ' >{loggedUser?.username}</h3>
                        </div>
                        <div className="flex flex-col items-center gap-4 ">
                            <h2 className='text-xl font-medium text-cool-gray-dark ' >Biography</h2>
                            <p className='text-sm text-center font-medium text-warm-gray-dark ' >{loggedUser?.bio || 'Your Bio here...'}</p>
                        </div>
                    </div>
                    <div className="flex flex-col col-span-5 gap-14 ">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4 w-full ">
                            <div className="col-span-2 flex flex-col justify-between items-start gap-4 w-full">
                                <div className="flex justify-between items-center w-full ">
                                    <h3 className='text-xl font-medium text-blackish-darken ' >Basic Info</h3>
                                    <div className="flex justify-end items-center gap-2 ">
                                        <Button onClick={handleSubmit} >Save</Button>
                                    </div>
                                </div>
                                <Separator />
                            </div>
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }: { field: any }) => (
                                    <FormItem className='md:col-span-1 col-span-2 ' >
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input className='bg-secondary' placeholder="John" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }: { field: any }) => (
                                    <FormItem className='md:col-span-1 col-span-2 ' >
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input className='bg-secondary' placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }: { field: any }) => (
                                    <FormItem className='md:col-span-1 col-span-2 ' >
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input className='bg-secondary' placeholder="johndoe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }: { field: any }) => (
                                    <FormItem className='md:col-span-1 col-span-2 ' >
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input className='bg-secondary' placeholder="johndoe@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }: { field: any }) => (
                                    <FormItem className='md:col-span-1 col-span-2 ' >
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input className='bg-secondary' placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* About Me */}
                        <div className="flex flex-col gap-4 w-full ">
                            <div className="flex flex-col justify-between items-start gap-4 w-full ">
                                <h3 className='text-xl font-medium text-blackish-darken ' >About Me</h3>
                                <Separator />
                            </div>
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }: { field: any }) => (
                                    <FormItem className='md:col-span-1 col-span-2 ' >
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className='bg-secondary'
                                                placeholder="Something about you"
                                                rows={5}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* External Links */}
                        <div className="flex flex-col gap-4 w-full ">
                            <div className="flex flex-col justify-between items-start gap-4 w-full ">
                                <h3 className='text-xl font-medium text-blackish-darken ' >External Links</h3>
                                <Separator />
                            </div>
                            <FormField
                                control={form.control}
                                name="externalLinks"
                                render={({ field }: { field: any }) => (
                                    <FormItem className='md:col-span-1 col-span-2 ' >
                                        <FormLabel>Github</FormLabel>
                                        <FormControl>
                                            <Input className='bg-secondary' placeholder="Github" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="externalLinks"
                                render={({ field }: { field: any }) => (
                                    <FormItem className='md:col-span-1 col-span-2 ' >
                                        <FormLabel>Linkedin</FormLabel>
                                        <FormControl>
                                            <Input className='bg-secondary' placeholder="Linkedin" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="externalLinks"
                                render={({ field }: { field: any }) => (
                                    <FormItem className='md:col-span-1 col-span-2 ' >
                                        <FormLabel>Instgram</FormLabel>
                                        <FormControl>
                                            <Input className='bg-secondary' placeholder="Instagram" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="externalLinks"
                                render={({ field }: { field: any }) => (
                                    <FormItem className='md:col-span-1 col-span-2 ' >
                                        <FormLabel>Facebook</FormLabel>
                                        <FormControl>
                                            <Input className='bg-secondary' placeholder="Facebook" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Button */}
                        <div className='flex justify-end items-center  ' >
                            <Button onClick={handleSubmit} >Save</Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default ProfileEditPage;
