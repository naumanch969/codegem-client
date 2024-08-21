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


export const EmailNotificationsModal = () => {

    // <--------------------------------------------------- VARIABLES ---------------------------------------------------->
    const dispatch = useDispatch();
    const { isOpen: { notification: { emailNotifications: isOpen } }, onClose } = useSettingModals()
    const { isFetching }: { loggedUser: User | null, isFetching: boolean } = useSelector((state: RootState) => state.user)
    const { setting } = useSelector((state: RootState) => state.setting)
    const formSchema = z.object({
        emailNotifications: z.string().min(1, { message: 'EmailNotifications is required.' }),
    })

    const initialData: z.infer<typeof formSchema> = { emailNotifications: '', }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { emailNotifications: setting?.notificationSettings?.emailNotifications }
    })


    // <---------------------------------------------------- FUNCTIONS ----------------------------------------------------------->
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const input = { notificationSettings: { ...setting?.notificationSettings, emailNotifications: values.emailNotifications } }
        dispatch<any>(updateSettings(input))
            .then(() => {
                onCancel()
            })
    }
    const onCancel = () => {
        onClose(SettingParentField?.notification, SettingSubField?.emailNotifications)
        form.reset(initialData);
    }

    return (
        <Modal
            title={'Notification settings'}
            description={'Edit your email notification setting.'}
            isOpen={isOpen}
            onClose={onCancel}
            className='md:w-[35rem] sm:w-[90vw] w-full  '
        >

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1 ">
                    <FormField
                        control={form.control}
                        name="emailNotifications"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Email Notifications</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Enabled">Enable</SelectItem>
                                        <SelectItem value="Disabled">Disable</SelectItem>
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
