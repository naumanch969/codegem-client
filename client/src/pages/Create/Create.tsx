import { CodeOff, CodeOutlined, CollectionsTwoTone, Group, SyncProblem } from '@mui/icons-material';
import React from 'react';
import { useCodeModal } from '../../hooks/useCodeModal';
import { useStreakModal } from '../../hooks/useStreakModal';
import { useChallengeModal } from '../../hooks/useChallengeModal';
import { useCollectionModal } from '../../hooks/useCollectionModal';
import { useGroupModal } from '../../hooks/useGroupModal';

const Create = () => {

    ///////////////////////////// VARIABLES /////////////////////////////////////
    const { onOpen: onCodeOpen, onSetCode, onSetCollectionId: onSetCollectionIdForCode, onSetGroupId: onSetGroupIdForCode } = useCodeModal()
    const { onOpen: onStreakOpen, onSetStreak, onSetCollectionId: onSetCollectionIdForStreak, onSetGroupId: onSetGroupIdForStreak } = useStreakModal()
    const { onOpen: onChallengeOpen, onSetChallenge, onSetCollectionId: onSetCollectionIdForChallenge, onSetGroupId: onSetGroupIdForChallenge } = useChallengeModal()
    const { onOpen: onCollectionOpen } = useCollectionModal()
    const { onOpen: onGroupOpen } = useGroupModal()

    const arr = [
        { onClick: () => { onSetCode(null); onCodeOpen(); onSetCollectionIdForCode(''); onSetGroupIdForCode('') }, name: 'Create Code', icon: CodeOutlined },
        { onClick: () => { onSetStreak(null); onStreakOpen(); onSetCollectionIdForStreak(''); onSetGroupIdForStreak('') }, name: 'Create Streak', icon: CodeOff },
        { onClick: () => { onSetChallenge(null); onChallengeOpen(); onSetCollectionIdForChallenge(''); onSetGroupIdForChallenge('') }, name: 'Create Challenge', icon: SyncProblem },
        { onClick: onCollectionOpen, name: 'Create Collection', icon: CollectionsTwoTone },
        { onClick: onGroupOpen, name: 'Create Group', icon: Group },
    ];

    ///////////////////////////// STATES ////////////////////////////////////////

    ///////////////////////////// RENDER ////////////////////////////////////////
    return (
        <div className='bg-gray-100 w-full p-8 grid grid-cols-3 gap-8'>
            {
                arr.map((item, index) => (
                    <div onClick={item.onClick} key={index} className={`flex flex-col justify-center items-center p-4 border rounded shadow-xl bg-white group hover:text-teal-blue '
                        } hover:scale-105 transition-all duration-300 border border-gray-800 hover:border-teal-blue cursor-pointer `}>
                        <div className="flex flex-col items-center gap-4 mb-3">
                            <item.icon style={{ fontSize: '5rem' }} />
                            <p className={`text-2xl font-semibold capitalize text-gray-800 group-hover:text-teal-blue `}>
                                {item.name}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Create;