import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCode, updateCode } from '../../redux/actions/code';
import { RootState } from '../../redux/store';
import { User, } from '../../interfaces';
import { useCodeModal } from '../../hooks/useCodeModal';
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
import { Combobox } from '@/components/ui/combobox';
import { programmingLanguages } from '@/constant';
import { Required } from '@/utils/Components';


const CreateCode = () => {

    // <---------------------------------------------------- VARIABLES ----------------------------------------------------------->
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const { isOpen, onClose, code, collectionId, groupId } = useCodeModal()
    const { isFetching } = useSelector((state: RootState) => state.code)
    const formSchema = z.object({
        title: z.string().min(1, { message: 'Title is required.' }).max(250, { message: 'Title can\'t be longer than 250 characters.' }),
        description: z.string().optional(),
        code: z.string().min(1, { message: 'Code is required.' }),
        language: z.string().min(1, { message: 'Language is required.' }),
        hashTags: z.array(z.string()).optional(),
        visibility: z.string().min(1).max(50),
    });


    const initialData: z.infer<typeof formSchema> = {
        title: "",
        description: "",
        code: "",
        language: "",
        hashTags: [],
        visibility: "public",
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: code || initialData,
    })
    const dispatch = useDispatch();

    // <---------------------------------------------------- STATES ----------------------------------------------------------->
    const [hashTag, setHashTag] = useState('')

    // <---------------------------------------------------- FUNCTIONS ----------------------------------------------------------->
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // TODO: check format of data being sent to backend
        console.log('values', values)
        if (Boolean(code)) { // update
            if (groupId)
                dispatch<any>(updateCode(code?._id as string, { ...values, group: groupId }, onClose, toast))
            else if (collectionId)
                dispatch<any>(updateCode(code?._id as string, { ...values, collection: collectionId }, onClose, toast))
            else
                dispatch<any>(updateCode(code?._id as string, values, onClose, toast))
        }
        else {  // create
            if (groupId)
                dispatch<any>(createCode({ ...values, group: groupId }, onClose, toast))
            else if (collectionId)
                dispatch<any>(createCode({ ...values, collection: collectionId }, onClose, toast))
            else
                dispatch<any>(createCode(values, onClose, toast));
        }

        form.reset(initialData);
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
    const onFilterHashTag = (text: string, field: { value: string[], onChange: (value: string[]) => void }) => {
        const updatedMain = field.value.filter(item => item !== text);
        field.onChange(updatedMain);
    };

    return (
        <Modal
            title={`${Boolean(code) ? 'Update' : 'Create'} code`}
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
                        <p className='font-semibold text-blackish text-lg capitalize ' >{loggedUser?.firstName} {loggedUser?.lastName}</p>
                    </div>
                    <Select onValueChange={(value: string) => form.setValue("visibility", value)} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Public" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 ">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel className='flex gap-1 items-center' >Title <Required /></FormLabel>
                                    <FormControl>
                                        <Input className='bg-secondary' placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel className='flex gap-1 items-center' >Code <Required /></FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={10}
                                            disabled={isFetching}
                                            placeholder="Paste your code here."
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
                                    <FormLabel className='flex gap-1 items-center' >Language <Required /></FormLabel>
                                    <FormControl>
                                        <Combobox
                                            items={programmingLanguages}
                                            onSelect={(value: string) => field.onChange(value)}
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
                                    <FormLabel className='flex gap-1 items-center' >Hash Tags</FormLabel>
                                    <FormControl>
                                        <>
                                            <Input
                                                placeholder="Text - separated by enter"
                                                value={hashTag}
                                                onChange={(e) => setHashTag(e.target.value!)}
                                                onKeyDown={(e) => { handleAddHashTag(e, field!) }}
                                                className='bg-secondary'
                                            />
                                            <div className="space-x-1">
                                                {field.value?.map((text: string, index: number) => (
                                                    <Badge key={index}>
                                                        {text}{' '}
                                                        <X onClick={() => onFilterHashTag(text, field!)} className="w-4 h-4 rounded-full" />
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
                            name="description"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel className='flex gap-1 items-center' >Description <span className='text-body' >(Optional but preferred)</span></FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={3}
                                            disabled={isFetching}
                                            placeholder="Description"
                                            className='bg-secondary'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end items-center gap-2 w-full">
                            <Button variant='outline' onClick={(e) => { e.preventDefault(); onClose(); form.reset(initialData); }} >Cancel</Button>
                            <Button disabled={isFetching} type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>


            </div>

        </Modal>
    )
}

export default CreateCode