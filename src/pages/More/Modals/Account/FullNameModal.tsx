import { Modal } from '@/components/ui/modal'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { RootState } from '@/redux/store';
import { Input } from '@/components/ui/input';
import { User } from '@/interfaces';
import { updateProfile } from '@/redux/reducers/userSlice';
import { useSettingModals } from '@/hooks/useSettingModals';

export const FullNameModal = () => {

    // <--------------------------------------------------- VARIABLES ---------------------------------------------------->
    const dispatch = useDispatch();
    const { isOpen: { account: { fullName: isOpen } }, onClose } = useSettingModals()
    const { loggedUser, isFetching }: { loggedUser: User | null, isFetching: boolean } = useSelector((state: RootState) => state.user)
    const formSchema = z.object({
        firstName: z.string().min(1, { message: 'FirstName is required.' }),
        lastName: z.string().min(1, { message: 'LastName is required.' }),
    })
    const initialData: z.infer<typeof formSchema> = { firstName: '', lastName: '' }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { firstName: loggedUser?.firstName!, lastName: loggedUser?.lastName! }
    })

    // <---------------------------------------------------- FUNCTIONS ----------------------------------------------------------->
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        dispatch<any>(updateProfile(values))
            .then(() => {
                onCancel()
            })
    }
    const onCancel = () => {
        onClose('account', 'fullName')
        form.reset(initialData);
    }

    return (
        <Modal
            title={'Basic Info'}
            description={'Edit your full name.'}
            isOpen={isOpen}
            onClose={onCancel}
            className='md:w-[35rem] sm:w-[90vw] w-full  '
        >

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1 ">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }: { field: any }) => (
                            <FormItem>
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
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input className='bg-secondary' placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end items-center gap-2 w-full">
                        <Button variant='outline' onClick={(e) => { e.preventDefault(); onCancel(); }} >Cancel</Button>
                        <Button disabled={isFetching} type="submit">Submit</Button>
                    </div>
                </form>
            </Form>


        </Modal>
    )
}
