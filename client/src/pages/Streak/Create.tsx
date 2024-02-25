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
import { programmingLanguages } from '@/constant';
import { Combobox } from '@/components/ui/combobox';


const CreateStreak = ({ groupId, handleSubmit }: { groupId?: string, handleSubmit?: (data: any) => void }) => {

    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const { isFetching }: { isFetching: boolean } = useSelector((state: RootState) => state.streak)
    const { isOpen, onClose, streak } = useStreakModal()

    const formSchema = z.object({
        title: z.string().min(1, { message: 'Title is required.' }).max(250, { message: 'Title can\' be longer than 250 characters.' }),
        description: z.string().min(1, { message: 'Description is required.' }),
        language: z.string().min(1, { message: 'Language is required.' }),
        streak: z.object({ description: z.string(), code: z.string() }).array(),
        hashTags: z.array(z.string({ required_error: "Hashtags are required." })),
        visibility: z.string().min(1).max(50),
    })

    const initialData: z.infer<typeof formSchema> = {
        title: "",
        description: "",
        language: "",
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
                            <SelectValue placeholder="Visibility" defaultValue='public' />
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
                            control={form.control}
                            name="language"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Language</FormLabel>
                                    <FormControl>
                                        <Combobox
                                            items={programmingLanguages}
                                            onSelect={(value: string) => { field.onChange(value); console.log('value', value) }}
                                            onFilter={(value: string) => { }}
                                            selected={field.value}
                                            className='w-full bg-secondary text-light text-muted-foreground '
                                            emptyString='No language found.'
                                            isMultiple={false}
                                            placeholder='Language'
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


