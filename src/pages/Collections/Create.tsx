import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCollection, updateCollection } from '../../redux/actions/collection';
import { RootState } from '../../redux/store';
import { useCollectionModal } from '../../hooks/useCollectionModal';
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
import { Modal } from '@/components/ui/modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import toast from 'react-hot-toast';
import { User } from '@/interfaces';
import { Combobox } from '@/components/ui/combobox';
import { programmingLanguages } from '@/constant';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';


const CreateCollection = () => {

    // <---------------------------------------------------- VARIABLES ----------------------------------------------------------->
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const { isOpen, onClose, collection } = useCollectionModal()
    const { isFetching } = useSelector((state: RootState) => state.collection)

    const formSchema = z.object({
        name: z.string().min(1, { message: 'Name is required.' }).max(250, { message: 'Title can\' be longer than 250 characters.' }),
        description: z.string().min(1, { message: 'Description is required.' }),
        language: z.string().min(1, { message: 'Language is required.' }),
        categories: z.string().min(1, { message: 'Category is required.' }).array(),
        visibility: z.string().min(1).max(50),
    })

    const initialData: z.infer<typeof formSchema> = {
        name: "",
        description: "",
        language: "",
        categories: [],
        visibility: "public",
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: collection || initialData,
    })
    const dispatch = useDispatch();

    // <---------------------------------------------------- STATES ----------------------------------------------------------->
    const [category, setCategory] = useState('')


    // <---------------------------------------------------- FUNCTIONS ----------------------------------------------------------->
    const onSubmit = (values: z.infer<typeof formSchema>) => {

        if (Boolean(collection)) { // update
            dispatch<any>(updateCollection(collection?._id as string, values, onClose, toast))
        }
        else {  // create
            dispatch<any>(createCollection(values, onClose, toast));
        }


        form.reset(initialData);
    }
    const onAddCategory = (e: React.KeyboardEvent<HTMLInputElement>, field: { value: string[], onChange: (value: string[]) => void },) => {
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
    const onCategoryFilter = (text: string, field: { value: string[], onChange: (value: string[]) => void }) => {
        const updated = field.value.filter(item => item !== text);
        field.onChange(updated);
    };


    return (
        <Modal
            title={`${Boolean(collection) ? 'Update' : 'Create'} collection`}
            description=''
            isOpen={isOpen}
            onClose={onClose}
            className='bg-card lg:w-[40vw] md:w-[50vw] sm:w-[80vw] w-full min-h-[20rem] h-fit '
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
                            name="name"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        {/* TODO: make all input fields disabled if isFetching is true */}
                                        <Input className='bg-secondary' placeholder="Name of collection" {...field} />
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
                            control={form.control}
                            name="language"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Language</FormLabel>
                                    <FormControl>
                                        <Combobox
                                            items={programmingLanguages}
                                            onSelect={(value: string) => field.onChange(value) }
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
                                                placeholder="Category - separated by enter    (i.e., Technology, Android, Ideas etc.)"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                onKeyDown={(e) => { onAddCategory(e, field) }}
                                                className='bg-secondary'
                                            />
                                            <div className="space-x-1">
                                                {field.value?.map((text: string, index: number) => (
                                                    <Badge key={index}>
                                                        {text}{' '}
                                                        <X onClick={() => onCategoryFilter(text, field)} className="w-4 h-4 rounded-full" />
                                                    </Badge>
                                                ))}
                                            </div>
                                        </>
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

export default CreateCollection