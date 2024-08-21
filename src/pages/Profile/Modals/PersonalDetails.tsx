import { Modal } from '@/components/ui/modal'
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { RootState } from '@/redux/store';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { editPersonalDetails } from '@/redux/reducers/userSlice';
import { User } from '@/interfaces';

export const PersonalDetails = ({ title, description, isOpen, onClose }: { title: string, description: string, isOpen: boolean, onClose: () => void }) => {

    // <--------------------------------------------------- VARIABLES ---------------------------------------------------->
    const { loggedUser, isFetching }: { loggedUser: User | null, isFetching: boolean } = useSelector((state: RootState) => state.user)
    const formSchema = z.object({
        [title.toLowerCase()]: z.string().min(1, { message: 'This field is required.' }).array()
    })

    const initialData: z.infer<typeof formSchema> = {
        [title.toLowerCase()]: [],
    }

    const books = loggedUser?.books!
    const hobbies = loggedUser?.hobbies!
    const programming = loggedUser?.programming!
    const interests = loggedUser?.interests!
    const previousValues = title == 'Interests' ? { interests } : title == 'Hobbies' ? { hobbies } : title == 'Books' ? { books } : { programming }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: previousValues || initialData,
    })
    const dispatch = useDispatch();

    // <--------------------------------------------------- STATES ---------------------------------------------------->
    const [value, setValue] = useState<string>('')


    // <---------------------------------------------------- FUNCTIONS ----------------------------------------------------------->
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        dispatch<any>(editPersonalDetails({
            type: title.split(" ")[0].toLowerCase() as "interests" | "hobbies" | "books" | "programming",
            values: values[title.toLowerCase()]
        }))

        onClose()
        form.reset(initialData);
    }
    const handleAddValue = (e: React.KeyboardEvent<HTMLInputElement>, field: { value: string[], onChange: (value: string[]) => void },) => {
        if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
            setValue('')
            e.preventDefault();
            field.value
                ?
                field.onChange([...field?.value, e.currentTarget.value])
                :
                field.onChange([e.currentTarget.value]);
        }
    };
    const handleFilterValue = (text: string, field: { value: string[], onChange: (value: string[]) => void }) => {
        const updatedMain = field.value.filter(item => item !== text);
        field.onChange(updatedMain);
    };


    return (
        <Modal
            title={title}
            description={description}
            isOpen={isOpen}
            onClose={onClose}
            className='w-[25rem]  '
        >

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1 ">
                    <FormField
                        name={title.toLowerCase()}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2 ">
                                <FormControl>
                                    <>
                                        <Input
                                            placeholder="Text - separated by enter"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            onKeyDown={(e) => { handleAddValue(e, field) }}
                                            className='bg-secondary'
                                        />
                                        <div className="space-x-1">
                                            {field.value?.map((text: string, index: number) => (
                                                <Badge key={index}>
                                                    {text}{' '}
                                                    <X onClick={() => handleFilterValue(text, field)} className="w-4 h-4 rounded-full" />
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


        </Modal>
    )
}
