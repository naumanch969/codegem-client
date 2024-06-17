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

export const WhoCanSeeMyPostsModal = () => {

    // <--------------------------------------------------- VARIABLES ---------------------------------------------------->
    const { isOpen: { account: { bio: isOpen } }, onClose } = useSettingModals()
    const { loggedUser, isFetching }: { loggedUser: User | null, isFetching: boolean } = useSelector((state: RootState) => state.user)
    const formSchema = z.object({
        bio: z.string().min(1, { message: 'Bio is required.' }),
    })

    const initialData: z.infer<typeof formSchema> = {
        bio: '',
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: loggedUser! || initialData,
    })
    const dispatch = useDispatch();


    // <---------------------------------------------------- FUNCTIONS ----------------------------------------------------------->
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        dispatch<any>(updateProfile(values))
        onCancel()
    }
    const onCancel = () => {
        onClose('account', 'bio')
        form.reset(initialData);
    }

    return (
        <Modal
            title={'Basic Info'}
            description={'Edit your bio.'}
            isOpen={isOpen}
            onClose={onCancel}
            className='md:w-[35rem] sm:w-[90vw] w-full  '
        >

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1 ">
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Input className='bg-secondary' placeholder="johndoe" {...field} />
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
