import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCollections } from '../../redux/actions/collection';
import { saveStreakInCollections } from '../../redux/actions/streak';
import { RootState } from '../../redux/store';
import { Streak, Collection, User } from '../../interfaces';
import { Modal } from '@/components/ui/modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const SaveStreak = ({ open, setOpen, streak }: { open: boolean, setOpen: any, streak: Streak }) => {

    ///////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
    const dispatch = useDispatch();
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user);
    const { userCollections }: { userCollections: Collection[] } = useSelector((state: RootState) => state.collection);

    ///////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
    const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

    ///////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
    useEffect(() => {
                // Place User Collection
    }, [])

    ///////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////
    const handleSave = () => {
        dispatch<any>(saveStreakInCollections(streak, selectedCollections, setOpen));
        setSelectedCollections([])
    };
    const handleToggleSelectedCollection = (collectionId: string) => {
        if (selectedCollections.includes(collectionId)) {
            setSelectedCollections((pre) => pre.filter(cId => cId != collectionId))
        } else {
            setSelectedCollections((pre) => [...pre, collectionId])
        }
    }



    return (
        <Modal
            title={`Save streak`}
            description=''
            isOpen={open}
            onClose={() => setOpen(false)}
            className='bg-card w-[40rem] min-h-[20rem] h-fit '
        >

            {/* avatar */}
            <div className="w-full flex justify-between items-center">
                <div className='flex items-center gap-3 ' >
                    <Avatar>
                        <AvatarImage src={loggedUser?.profilePicture} alt="Profile" />
                        <AvatarFallback>{loggedUser?.firstName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className='font-semibold text-blackish text-lg capitalize ' >{loggedUser?.firstName} {loggedUser?.lastName}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4 ">
                {userCollections.map((collection, index) => {
                    let disabled = collection.streaks.findIndex(c => c._id == streak._id) != -1
                    return (
                        <Button
                            key={index}
                            disabled={disabled}
                            onClick={() => handleToggleSelectedCollection(collection._id)}
                            variant={selectedCollections.includes(collection._id) ? 'default' : 'outline'}
                            className='flex flex-col gap-1 justify-start items-start h-fit w-full '
                        >
                            <h5 className={`font-semibold text-2xl capitalize `}>{collection.name}</h5>
                            <span className={`font-medium text-md ${selectedCollections.includes(collection._id) ? 'text-white' : 'text-foreground '}`}>{collection.streaks.length} Streaks</span>
                        </Button>
                    )
                })}
            </div>

            <div className='flex justify-end w-full ' >
                <Button onClick={handleSave} disabled={selectedCollections.length == 0} >Save</Button>
            </div>

        </Modal >
    );
};

export default SaveStreak;