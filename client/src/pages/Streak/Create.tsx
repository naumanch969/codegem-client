import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStreak, updateStreak } from '../../redux/actions/streak';
import { RootState } from '../../redux/store';
import { User } from '../../interfaces';
import { useStreakModal } from '../../hooks/useStreakModal';
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import toast from 'react-hot-toast';


const CreateStreak = ({ groupId, handleSubmit }: { groupId?: string, handleSubmit?: (data: any) => void }) => {

    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const { isFetching }: { isFetching: boolean } = useSelector((state: RootState) => state.streak)
    const { isOpen, onClose, streak } = useStreakModal()

    const formSchema = z.object({
        title: z.string().min(2, { message: 'Title must contain atleast 2 characters.' }).max(250, { message: 'Title can\' be longer than 250 characters.' }),
        description: z.string().min(2, { message: 'Description must contain atleast 2 characters.' }),
        streak: z.object({ description: z.string(), code: z.string() }).array(),
        hashTags: z.array(z.string({ required_error: "Hashtags are required." })),
        visibility: z.string().min(2).max(50),
    })

    const initialData: z.infer<typeof formSchema> = {
        title: "",
        description: "",
        streak: [],
        hashTags: [],
        visibility: "public",
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: streak || initialData,
    })
    const isLoading = form.formState.isSubmitting;
    const dispatch = useDispatch();

    const [hashTag, setHashTag] = useState('')
    const [streaks, setStreaks] = useState<{ description: string, code: string }[]>([{ description: '', code: '' }])

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // FOR COLLECTION CODE CREATE
        if (handleSubmit) {
            handleSubmit(values)
            return
        }

        if (Boolean(streak)) {
            groupId ?
                dispatch<any>(updateStreak(streak?._id!, { ...values, groupId, streak: streaks }, onClose, toast))
                :
                dispatch<any>(updateStreak(streak?._id!, { ...values, streak: streaks }, onClose, toast));
        }
        else {
            groupId ?
                dispatch<any>(createStreak({ ...values, groupId, streak: streaks }, onClose, toast))
                :
                dispatch<any>(createStreak({ ...values, streak: streaks }, onClose, toast));
        }
    }
    const handleAddHashTag = (e: React.KeyboardEvent<HTMLInputElement>, field: { value: string[], onChange: (value: string[]) => void },) => {
        if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
            setHashTag('')
            e.preventDefault();
            field.value
                ?
                field.onChange([...field?.value, e.currentTarget.value])
                :
                field.onChange([e.currentTarget.value]);
        }
    };
    const handleFilterHashTag = (text: string, field: { value: string[], onChange: (value: string[]) => void }) => {
        const updatedMain = field.value.filter(item => item !== text);
        field.onChange(updatedMain);
    };


    return (
        <Modal
            title={`${Boolean(streak) ? 'Update' : 'Create'} streak`}
            description=''
            isOpen={isOpen}
            onClose={onClose}
            className='bg-card w-[50vw] min-h-[20rem] h-fit '
        >

            <div className='min-h-[82%] h-auto flex flex-col justify-between gap-[8px] p-1 ' >

                {/* avatar */}
                <div className="w-full flex justify-between items-center">
                    <div className='flex items-center gap-3 ' >
                        <Avatar>
                            <AvatarImage src={loggedUser?.profilePicture} alt="Profile" />
                            <AvatarFallback>{loggedUser?.firstName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className='font-semibold text-dark-slate-blue text-lg capitalize ' >{loggedUser?.firstName} {loggedUser?.lastName}</p>
                    </div>
                    <Select onValueChange={(value: string) => form.setValue("visibility", value)} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Visibility" default='public' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input className='bg-secondary' placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={4}
                                            disabled={isLoading}
                                            placeholder="Description"
                                            className='bg-secondary'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="hashTags"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-1 md:col-span-2 ">
                                    <FormLabel>
                                        Hash Tags
                                    </FormLabel>
                                    <FormControl>
                                        <>
                                            <Input
                                                placeholder="Text - separated by enter"
                                                value={hashTag}
                                                onChange={(e) => setHashTag(e.target.value)}
                                                onKeyDown={(e) => { handleAddHashTag(e, field) }}
                                                className='bg-secondary'
                                            />
                                            <div className="space-x-1">
                                                {field.value?.map((text: string, index: number) => (
                                                    <Badge key={index}>
                                                        {text}{' '}
                                                        <X onClick={() => handleFilterHashTag(text, field)} className="w-4 h-4 rounded-full" />
                                                    </Badge>
                                                ))}
                                            </div>
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="streak"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex justify-between items-center w-full' >
                                        <span>Streaks</span>
                                        <Button variant='link' onClick={(e) => {
                                            e.preventDefault();
                                            setStreaks([{ description: '', code: '' }, ...streaks])
                                        }}>Add streak</Button>
                                    </FormLabel>
                                    <div>
                                        {
                                            streaks.map((item, index) => (
                                                <div key={index} className="flex flex-col gap-2 bg-muted p-2 ">
                                                    <div className='flex flex-col justify-start gap-1' >
                                                        <div className="flex justify-between items-center">
                                                            <label htmlFor="streak" className='flex-[1] text-cool-gray ' >Description:</label>
                                                            <Button variant='link' onClick={(e) => { e.preventDefault(); setStreaks((pre) => pre.filter((_, i: number) => i !== index)) }}>
                                                                Remove
                                                            </Button>
                                                        </div>
                                                        <Input
                                                            name='streak.description'
                                                            placeholder='Description'
                                                            value={item.description}
                                                            onChange={(e) => setStreaks(pre => pre.map((s, i) => i === index ? { ...s, description: e.target.value } : s))}
                                                        />
                                                    </div>
                                                    <div className='flex flex-col justify-start gap-1' >
                                                        <label htmlFor="streak" className='flex-[1] text-cool-gray ' >Code:</label>
                                                        <Textarea
                                                            rows={5}
                                                            placeholder='Paste your code here'
                                                            value={item.code}
                                                            onChange={(e) => setStreaks(pre => pre.map((s, i) => i === index ? { ...s, code: e.target.value } : s))}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end items-center gap-2 w-full">
                            <Button variant='outline' onClick={(e) => { e.preventDefault(); onClose() }} >Cancel</Button>
                            <Button disabled={isFetching} type="submit">{isLoading ? 'Submitting...' : 'Submit'}</Button>
                        </div>
                    </form>
                </Form>


            </div>

        </Modal >
    )




}

export default CreateStreak







// <Modal open={isOpen} onClose={() => onClose()} className='flex justify-center items-center ' >
//     <div className='bg-white w-[50vw] min-h-[20rem] h-fit max-h-[90vh] overflow-y-scroll rounded-[8px] p-[1rem] ' >

//         <div className='h-[12%] relative flex justify-center items-center pb-[12px] ' >
//             <h4 className='text-[22px] font-bold text-dark-slate-blue ' >Create Streak</h4>
//             <button onClick={() => onClose()} className='absolute right-0 w-[2rem] h-[2rem] rounded-full bg-transparent ' ><Close className='text-cool-gray' /></button>
//         </div>

//         <hr className='h-[2px] w-full py-[12px] text-warm-gray  ' />

//         <div className='min-h-[82%] h-auto flex flex-col justify-between gap-[8px] ' >

//             {/* avatar */}
//             <div className='flex gap-[1rem] ' >
//                 <Avatar src={image6} />
//                 <div className='flex flex-col ' >
//                     <p className='font-semibold text-dark-slate-blue ' >Nauman Ch</p>
//                     <div className='relative flex flex-col justify-center items-start gap-1cursor-pointer rounded-t-[4px] min-w-[9rem] bg-gray-100 ' >

//                         <button onClick={() => setShowVisibilityMenu(pre => !pre)} className='w-full flex justify-between items-center p-[2px] ' >
//                             <span className="flex justify-start gap-[2px] capitalize " >
//                                 <Lock style={{ fontSize: '16px' }} className='text-[16px] ' />
//                                 <span className='text-[12px] font-medium ' >{streakData.visibility}</span>
//                             </span>
//                             <ArrowDropDown />
//                         </button>
//                         {
//                             showVisibilityMenu &&
//                             <div className='w-full absolute top-full bg-white shadow-box flex flex-col items-start gap-1rounded-b-[4px] ' >
//                                 {
//                                     menu.filter(m => m != streakData.visibility).map((item, index) => (
//                                         <button key={index} onClick={() => { setShowVisibilityMenu(false); setStreakData({ ...streakData, visibility: item }) }} className='w-full gap-[2px] text-start hover:bg-teal-blue -lighten hover:text-white text-cool-gray capitalize p-[2px] ' >
//                                             <Lock style={{ fontSize: '16px' }} className='text-[16px] ' />
//                                             <span className='text-[12px] font-medium ' >{item}</span>
//                                         </button>
//                                     ))
//                                 }
//                             </div>
//                         }

//                     </div>
//                 </div>
//             </div>



//             <div className='flex flex-col gap-[8px] ' >
//                 <div className="flex gap-[1rem] ">
//                     <div className={`flex flex-col gap-1w-[45%] `}  >
//                         <div className='flex flex-col justify-start gap-1w-full  ' >
//                             <label htmlFor="title" className='flex-[1] text-cool-gray ' >Title:</label>
//                             <textarea
//                                 name='title'
//                                 rows={2}
//                                 placeholder='Your title here....'
//                                 value={streakData.title}
//                                 onChange={handleChange}
//                                 className={`px-[4px] py-[2px] flex w-full outline-cool-gray bg-light-gray text-cool-gray border-cool-gray border-[1px] resize-none text-[16px] rounded-[4px] `}
//                             />
//                         </div>
//                         <div className="flex flex-col gap-1">
//                             <h6 className={`capitalize w-full text-[16px] text-cool-gray  `}>Technologies:</h6>
//                             <div className={`${streakData.hashTags.length && 'py-[8px] '} min-h-[54px] max-h-[12rem] overflow-y-scroll px-[8px] flex flex-wrap gap-[8px] w-full bg-light-gray text-cool-gray border-[1px] border-cool-gray rounded-[4px] `} >
//                                 <input
//                                     className="border-none resize-none h-[40px] py-[8px] bg-inherit outline-none text-[14px] text-cool-gray w-full rounded-[4px] "
//                                     placeholder="Technologies - separated by enter"
//                                     value={hashTagValue}
//                                     onChange={(e) => setHashTagValue(e.target.value)}
//                                     onKeyDown={handleAddHashTag}
//                                 />
//                                 {
//                                     streakData.hashTags.map((tech, index) => (
//                                         <HashTag title={tech} key={index} />
//                                     ))
//                                 }
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex flex-col gap-1w-[55%] ">
//                         <label htmlFor="description" className='flex-[1] text-cool-gray ' >Description<span className='text-[18px] text-teal-blue-darken ' >*</span> :</label>
//                         <textarea
//                             rows={4}
//                             name='description'
//                             placeholder='Write a short description of the streak?....'
//                             value={streakData.description}
//                             onChange={handleChange}
//                             className={`h-full px-[4px] py-[2px] flex w-full outline-cool-gray bg-light-gray text-cool-gray border-cool-gray border-[1px] resize-none text-[16px] rounded-[4px] `}
//                         />
//                     </div>
//                 </div>

//                 {/* streaks */}
//                 <div className="flex flex-col gap-1">
//                     <label htmlFor="title" className='font-medium flex-[1] text-cool-gray ' >Streak<span className='text-[18px] text-teal-blue-darken ' >*</span> :</label>
//                     <div className="flex flex-col gap-4">
// {
//     streakData.streak.map((item, index: number) => (
//         <div key={index} className="flex flex-col gap-2 bg-gray-50 p-2 ">
//             <div className='flex flex-col justify-start gap-1' >
//                 <div className="flex justify-between items-center">
//                     <label htmlFor="streak" className='flex-[1] text-cool-gray ' >Description:</label>
//                     <button
//                         onClick={() => {
//                             setStreakData((pre: Streak) => ({
//                                 ...pre,
//                                 streak: pre.streak.filter((_, i: number) => i !== index)
//                             }));
//                         }}
//                         className='hover:underline text-cool-gray text-sm '
//                     >Remove</button>
//                 </div>
//                 <input
//                     name='streak.description'
//                     placeholder='Paste your streak here....'
//                     value={item.description}
//                     onChange={(e) => {
//                         setStreakData((pre: Streak) => ({
//                             ...pre,
//                             streak: pre.streak.map((s, i) => i === index ? { ...s, description: e.target.value } : s)
//                         }));
//                     }}
//                     className={`px-[4px] py-[2px] min-h-[44px] flex flex-[5] w-full outline-cool-gray bg-light-gray text-cool-gray border-cool-gray border-[1px] resize-none text-[16px] rounded-[4px] `}
//                 />
//             </div>
//             <div className='flex flex-col justify-start gap-1' >
//                 <label htmlFor="streak" className='flex-[1] text-cool-gray ' >Code:</label>
//                 <TextareaAutosize
//                     rows={2}
//                     maxRows={5}
//                     name='streak.code'
//                     placeholder='Paste your streak here....'
//                     value={item.code}
//                     onChange={(e) => {
//                         setStreakData((pre: Streak) => ({
//                             ...pre,
//                             streak: pre.streak.map((s, i) => i === index ? { ...s, code: e.target.value } : s)
//                         }));
//                     }}
//                     className={`px-[4px] py-[2px] flex flex-[5] w-full outline-cool-gray bg-light-gray text-cool-gray border-cool-gray border-[1px] resize-none text-[16px] rounded-[4px] `}
//                 />
//             </div>
//         </div>
//     ))
// }

//                     </div>
//                     <div className="flex justify-start items-center px-2 ">
//                         <button onClick={() => setStreakData((pre: Streak) => ({ ...pre, streak: [...pre.streak, { description: '', code: '' }] }))} className='hover:underline text-teal-blue ' >Add Snippet</button>
//                     </div>
//                 </div>

//                 {/* buttons */}
//                 <div className='flex flex-col gap-[8px] ' >
//                     {/* streak button */}
//                     <div className='flex justify-end ' >
//                         <button
//                             onClick={handleCreate}
//                             disabled={!streakData.streak}
//                             className={` ${!streakData.streak ? 'cursor-not-allowed ' : 'cursor-pointer '} flex justify-center items-center w-[6rem] rounded-[4px] p-[4px] bg-teal-blue  text-white font-medium text-[18px] `} >
//                             {(codeLoading || collectionLoading) ? <CircularProgress style={{ width: '28px', height: '28px', color: '#fff' }} /> : 'Create'}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//         </div>

//     </div>
// </Modal>
