import { AccountTree, ChaletOutlined, CodeOff, CodeOutlined, Collections, CollectionsTwoTone, Group, GroupAdd, Person, SyncProblem } from '@mui/icons-material';
import React from 'react';

const CreateCode = ({ open, setOpen }: { open?: boolean, setOpen?: any }) => {
    ///////////////////////////// VARIABLES /////////////////////////////////////
    const arr = [
        { name: 'Create Code', icon: CodeOutlined },
        { name: 'Create Streak', icon: CodeOff },
        { name: 'Create Challenge', icon: SyncProblem },
        { name: 'Create Collection', icon: CollectionsTwoTone },
        { name: 'Create Group', icon: Group },
        { name: 'Create Account', icon: Person },
    ];

    ///////////////////////////// STATES ////////////////////////////////////////

    ///////////////////////////// RENDER ////////////////////////////////////////
    return (
        <div className='bg-gray-100 w-full p-8 grid grid-cols-3 gap-8'>
            {
                arr.map((item, index) => (
                    <div key={index} className={`flex flex-col justify-center items-center p-4 border rounded shadow-xl bg-white group hover:text-teal-blue '
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

export default CreateCode;
