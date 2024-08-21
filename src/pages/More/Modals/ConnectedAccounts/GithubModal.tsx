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
import { updateSettings } from '@/redux/reducers/settingSlice';
import { Input } from '@/components/ui/input';


export const GithubModal = () => {

    // <--------------------------------------------------- VARIABLES ---------------------------------------------------->
    const dispatch = useDispatch();
    const { isOpen: { connectedAccounts: { github: isOpen } }, onClose } = useSettingModals()
    const { isFetching }: { loggedUser: User | null, isFetching: boolean } = useSelector((state: RootState) => state.user)
    const { setting } = useSelector((state: RootState) => state.setting)
    const formSchema = z.object({
        github: z.string().min(1, { message: 'Github is required.' }),
    })

    const initialData: z.infer<typeof formSchema> = { github: '', }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { github: setting?.connectedAccounts?.github }
    })


    // <---------------------------------------------------- FUNCTIONS ----------------------------------------------------------->
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const input = { connectedAccounts: { ...setting?.connectedAccounts, github: values.github } }
        dispatch<any>(updateSettings(input))
            .then(() => {
                onCancel()
            })
    }
    const onCancel = () => {
        onClose(SettingParentField?.connectedAccounts, SettingSubField?.github)
        form.reset(initialData);
    }

    return (
        <Modal
            title={'Connected Accounts'}
            description={'Link/Unlink your github account.'}
            isOpen={isOpen}
            onClose={onCancel}
            className='md:w-[35rem] sm:w-[90vw] w-full  '
        >

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1 ">
                    <FormField
                        control={form.control}
                        name="github"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Github</FormLabel>
                                <FormControl>
                                    <Input className='bg-secondary' placeholder="Github Link" {...field} />
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
