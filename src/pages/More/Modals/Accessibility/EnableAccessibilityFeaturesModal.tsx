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


export const EnableAccessibilityFeaturesModal = () => {

    // <--------------------------------------------------- VARIABLES ---------------------------------------------------->
    const dispatch = useDispatch();
    const { isOpen: { accessibility: { enableAccessibilityFeatures: isOpen } }, onClose } = useSettingModals()
    const { isFetching }: { loggedUser: User | null, isFetching: boolean } = useSelector((state: RootState) => state.user)
    const { setting } = useSelector((state: RootState) => state.setting)
    const formSchema = z.object({
        enableAccessibilityFeatures: z.string().min(1, { message: 'EnableAccessibilityFeatures is required.' }),
    })

    const initialData: z.infer<typeof formSchema> = { enableAccessibilityFeatures: '', }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { enableAccessibilityFeatures: setting?.accessibilitySettings?.enableAccessibilityFeatures }
    })

    // <---------------------------------------------------- FUNCTIONS ----------------------------------------------------------->
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const input = { accessibilitySettings: { ...setting?.accessibilitySettings, enableAccessibilityFeatures: values.enableAccessibilityFeatures } }
        dispatch<any>(updateSettings(input))
            .then(() => {
                onCancel()
            })
    }
    const onCancel = () => {
        onClose(SettingParentField?.accessibility, SettingSubField?.enableAccessibilityFeatures)
        form.reset(initialData);
    }

    return (
        <Modal
            title={'Privacy Settings'}
            description={'Manage your profile visibility.'}
            isOpen={isOpen}
            onClose={onCancel}
            className='md:w-[35rem] sm:w-[90vw] w-full  '
        >

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1 ">
                    <FormField
                        control={form.control}
                        name="enableAccessibilityFeatures"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Enable</FormLabel>
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
