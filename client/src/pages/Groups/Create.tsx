import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup, updateGroup } from '../../redux/actions/group';
import { RootState } from '../../redux/store';
import { User, } from '../../interfaces';
import { useGroupModal } from '../../hooks/useGroupModal';
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


const CreateGroup = () => {    // handleSubmit is passed through collection create group

    // <---------------------------------------------------- VARIABLES ----------------------------------------------------------->
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const { isOpen, onClose, group } = useGroupModal()
    const { isFetching } = useSelector((state: RootState) => state.group)

    const formSchema = z.object({
        name: z.string().min(1, { message: 'Name is required.' }).max(250, { message: 'Name can\'t be longer than 250 characters.' }),
        description: z.string().min(1, { message: 'Description is required.' }),
        categories: z.array(z.string({ required_error: "Hashtags are required." })),
        languages: z.array(z.string({ required_error: "Hashtags are required." })),
        visibility: z.string().min(1).max(50),
    })

    const initialData: z.infer<typeof formSchema> = {
        name: "",
        description: "",
        categories: [],
        languages: [],
        visibility: "public",
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: group || initialData,
    })
    const dispatch = useDispatch();

    // <---------------------------------------------------- STATES ----------------------------------------------------------->
    const [category, setCategory] = useState('')

    // <---------------------------------------------------- FUNCTIONS ----------------------------------------------------------->
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log('test')
        console.log('values', values)
        if (Boolean(group)) { // update
            dispatch<any>(updateGroup(group?._id as string, values, onClose, toast))
        }
        else {  // create
            dispatch<any>(createGroup(values, onClose, toast));
        }

        form.reset(initialData);
    }
    const handleAddHashTag = (e: React.KeyboardEvent<HTMLInputElement>, field: { value: string[], onChange: (value: string[]) => void },) => {
        if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
            setCategory('')
            e.preventDefault();
            field.value
                ?
                field.onChange([...field?.value, e.currentTarget.value])
                :
                field.onChange([e.currentTarget.value]);
        }
    };
    const onLanguageSelect = (value: string, field: { value: string[], onChange: (value: string[]) => void },) => {

        const isExist = field.value.find(v => v.toLowerCase() == value.toLowerCase())

        if (isExist) {
            onFilter(value, field)
        }
        else {
            field.value
                ?
                field.onChange([...field?.value, value])
                :
                field.onChange([value]);
        }
    };
    const onFilter = (text: string, field: { value: string[], onChange: (value: string[]) => void }) => {
        const updated = field.value.filter(item => item !== text);
        field.onChange(updated);
    };


    return (
        <Modal
            title={`${Boolean(group) ? 'Update' : 'Create'} group`}
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
                    <form onSubmit={form.handleSubmit(() => console.log('test'))} className="space-y-2 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input className='bg-secondary' placeholder="Name" {...field} />
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
                        <FormField
                            name="categories"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-1 md:col-span-2 ">
                                    <FormLabel>
                                        Categories
                                    </FormLabel>
                                    <FormControl>
                                        <>
                                            <Input
                                                placeholder="Category - separated by enter    (i.e., Mobile Development, Web Development etc.)"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                onKeyDown={(e) => { handleAddHashTag(e, field) }}
                                                className='bg-secondary'
                                            />
                                            <div className="space-x-1">
                                                {field.value?.map((text: string, index: number) => (
                                                    <Badge key={index}>
                                                        {text}{' '}
                                                        <X onClick={() => onFilter(text, field)} className="w-4 h-4 rounded-full" />
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
                            name="languages"
                            control={form.control}
                            render={({ field }: { field: any }) => (
                                <FormItem className="col-span-1 md:col-span-2 ">
                                    <FormLabel>
                                        Languages
                                    </FormLabel>
                                    <FormControl>
                                        <>
                                            <Combobox
                                                items={programmingLanguages}
                                                onSelect={(value: string) => onLanguageSelect(value, field)}
                                                onFilter={(value: string) => onFilter(value, field)}
                                                selected={field.value}
                                                placeholder='Languages'
                                                emptyString='No language found'
                                                className='w-full bg-secondary '
                                            />
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end items-center gap-2 w-full">
                            <Button variant='outline' onClick={(e) => { e.preventDefault(); onClose(); form.reset(initialData); }} >Cancel</Button>
                            <Button disabled={isFetching} onClick={form.handleSubmit(onSubmit)} type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>


            </div>

        </Modal>
    )
}

export default CreateGroup