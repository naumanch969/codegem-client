import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { Modal } from '@/components/ui/modal';
import { getFriends } from '@/redux/reducers/friendSlice';
import { RootState } from '@/redux/store';
import { Chat } from '@/interfaces';
import { fetchChats, setChat, setCurrentChatSlice } from '@/redux/reducers/chatSlice';
import toast from 'react-hot-toast';
import { useStateContext } from '@/contexts/ContextProvider';


const InitiateChat = ({ open: isOpen, setOpen }: { open: boolean, setOpen: any }) => {
    // <---------------------------------------------------- VARIABLES ----------------------------------------------------------->
    const dispatch = useDispatch();
    const { friends: fetchedFriends } = useSelector((state: RootState) => state.friend)
    const { chats } = useSelector((state: RootState) => state.chat)
    const { loggedUser } = useSelector((state: RootState) => state.user)
    const { setSelectedChat } = useStateContext()
    const formSchema = z.object({ friendId: z.string().min(1, { message: 'Friend is required.' }).max(250, { message: 'Title can\' be longer than 250 characters.' }), })
    const initialData: z.infer<typeof formSchema> = { friendId: "", }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    })

    // <---------------------------------------------------- STATES ----------------------------------------------------------->
    const [isFetching, setIsFetching] = useState(false)
    const [friends, setFriends] = useState(fetchedFriends)

    // <---------------------------------------------------- USE EFFECTS ----------------------------------------------------------->
    useEffect(() => {
        if (chats?.length > 0) return
        dispatch<any>(fetchChats(loggedUser?._id!))
    }, []);
    useEffect(() => {
        if (friends.length == 0) setIsFetching(true)
        dispatch<any>(getFriends(``)).finally(() => setIsFetching(false))
    }, [])
    useEffect(() => {
        setFriends(fetchedFriends)
    }, [fetchedFriends])


    // <---------------------------------------------------- FUNCTIONS ----------------------------------------------------------->
    const onSubmit = (values: z.infer<typeof formSchema>) => {

        const findedChat = chats?.find(c => c?.participantIds?.includes(values?.friendId))
        const selectedFriend = friends?.find(f => f?._id == values?.friendId)
        if (findedChat) {
            localStorage.setItem('lastChat', findedChat?.id!);
            setSelectedChat({ ...findedChat, otherUser: selectedFriend! });
            dispatch(setCurrentChatSlice({ ...findedChat, otherUser: selectedFriend! }))
            onClose()
        }
        else {
            const input: Chat = {
                id: '',
                createdAt: new Date(),
                participantIds: [loggedUser?._id!, values?.friendId!],
                lastMessage: '',
                lastMessageTimestamp: new Date(),
                participants: [loggedUser!, selectedFriend!],
                messages: []
            }

            setIsFetching(true)
            dispatch<any>(setChat(input))
                .then(({ payload }: { payload: Chat }) => {
                    localStorage.setItem('lastChat', payload?.id!);
                    setSelectedChat({ ...payload, otherUser: selectedFriend! });
                    dispatch(setCurrentChatSlice({ ...payload, otherUser: selectedFriend! }))
                    onClose()
                })
                .catch(() => {
                    toast.error('Something went wrong!')
                })
                .finally(() => {
                    setIsFetching(false)
                })
        }

        form.reset(initialData);
    }
    const onClose = () => {
        setOpen(false)
    }

    return (
        <Modal
            title={`Initiate Chat`}
            description=''
            isOpen={isOpen}
            onClose={onClose}
            className='bg-card w-[35vw] h-fit '
        >

            <div className='min-h-[82%] h-auto flex flex-col justify-between gap-[8px] p-1 ' >

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
                        <FormField
                            control={form.control}
                            name="friendId"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Friends</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                friends?.map((friend, index) => (
                                                    <SelectItem key={index} value={friend?._id!}>@{friend?.username!}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
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

export default InitiateChat