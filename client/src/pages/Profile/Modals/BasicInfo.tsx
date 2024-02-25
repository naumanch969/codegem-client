import { Modal } from '@/components/ui/modal'
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { RootState } from '@/redux/store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User } from '@/interfaces';
import { updateProfile } from '@/redux/actions/user';

export const BasicInfo = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {

    // <--------------------------------------------------- VARIABLES ---------------------------------------------------->
    const { loggedUser, isFetching }: { loggedUser: User | null, isFetching: boolean } = useSelector((state: RootState) => state.user)
    const formSchema = z.object({
        username: z.string().min(1, { message: 'Username is required.' }),
        name: z.string().min(1, { message: 'Name is required.' }),
        email: z.string().min(1, { message: 'Email is required.' }),
        location: z.string(),
        title: z.string().min(1, { message: 'Bio is required.' }),
    })

    const initialData: z.infer<typeof formSchema> = {
        username: '',
        name: '',
        email: '',
        location: '',
        title: '',
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: loggedUser! || initialData,
    })
    const dispatch = useDispatch();

    // <--------------------------------------------------- STATES ---------------------------------------------------->
    // TODO: separate modal for each field (username, name, email etc.)


    // <---------------------------------------------------- FUNCTIONS ----------------------------------------------------------->
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        dispatch<any>(updateProfile(values))
        onClose()
        form.reset(initialData);
    }

    return (
        <Modal
            title={'Basic Info'}
            description={'Edit your basic information.'}
            isOpen={isOpen}
            onClose={onClose}
            className='md:w-[35rem] sm:w-[90vw] w-full  '
        >

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1 ">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }: { field: any }) => (
                            <FormItem>
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
                        name="name"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input className='bg-secondary' placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }: { field: any }) => (
                            <FormItem>
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
                        name="location"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input className='bg-secondary' placeholder="Location" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className='bg-secondary'
                                        placeholder="Something about you"
                                        rows={4}
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


        </Modal>
    )
}
