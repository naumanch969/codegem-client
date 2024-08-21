import { Modal } from '@/components/ui/modal'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { RootState } from '@/redux/store';
import { User } from '@/interfaces';
import { useSettingModals } from '@/hooks/useSettingModals';
import { SettingParentField, SettingSubField } from '@/enums';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { updateSettings } from '@/redux/reducers/settingSlice';


export const WhoCanSeeMyPostsModal = () => {

    // <--------------------------------------------------- VARIABLES ---------------------------------------------------->
    const dispatch = useDispatch();
    const { isOpen: { privacy: { whoCanSeeMyPosts: isOpen } }, onClose } = useSettingModals()
    const { isFetching }: { loggedUser: User | null, isFetching: boolean } = useSelector((state: RootState) => state.user)
    const { setting } = useSelector((state: RootState) => state.setting)
    const formSchema = z.object({
        whoCanSeeMyPosts: z.string().min(1, { message: 'WhoCanSeeMyPosts is required.' }),
    })

    const initialData: z.infer<typeof formSchema> = {
        whoCanSeeMyPosts: '',
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { whoCanSeeMyPosts: setting?.privacySettings?.whoCanSeeMyPosts } 
    })


    // <---------------------------------------------------- FUNCTIONS ----------------------------------------------------------->
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const input = { privacySettings: { ...setting?.privacySettings, whoCanSeeMyPosts: values.whoCanSeeMyPosts } }
        dispatch<any>(updateSettings(input))
            .then(() => {
                onCancel()
            })
    }
    const onCancel = () => {
        onClose(SettingParentField?.privacy, SettingSubField?.whoCanSeeMyPosts)
        form.reset(initialData);
    }

    return (
        <Modal
            title={'Privacy Settings'}
            description={'Manage who can see your posts.'}
            isOpen={isOpen}
            onClose={onCancel}
            className='md:w-[35rem] sm:w-[90vw] w-full  '
        >

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1 ">
                    <FormField
                        control={form.control}
                        name="whoCanSeeMyPosts"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Who can see my posts</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Everyone">Everyone</SelectItem>
                                        <SelectItem value="Friends">Friends</SelectItem>
                                    </SelectContent>
                                </Select>
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
