import React from 'react';
import { Link } from 'react-router-dom';
import { Group as GroupIcon, CheckCircle, ExitToApp } from '@mui/icons-material';
import { Group, User } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { joinGroup, leaveGroup } from '../../redux/actions/group';
import { RootState } from '../../redux/store';

const GroupCard = ({ group }: { group: Group }) => {

    //////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const isJoined = group?.members?.findIndex(memberId => memberId == loggedUser?._id) != -1

    //////////////////////////////////////////////// STATES /////////////////////////////////////////////////////

    //////////////////////////////////////////////// USE EFFECT /////////////////////////////////////////////////////

    //////////////////////////////////////////////// FUNCTION /////////////////////////////////////////////////////
    const handleJoinGroup = () => {
        dispatch<any>(joinGroup(group._id as string, loggedUser?._id as string))
    }
    const handleLeaveGroup = () => {
        dispatch<any>(leaveGroup(group._id as string, loggedUser?._id as string))
    }


    return (
        <div className={`flex flex-col justify-between p-4 border rounded shadow-lg ${isJoined ? 'bg-white' : 'bg-light-gray'
            } hover:scale-105 transition-all duration-300`}>
            <Link to={`/groups/${group._id}`} className="block">
                <div className="flex justify-between items-center mb-3">
                    <p className={`text-lg font-semibold capitalize ${isJoined ? 'text-gray-800' : 'text-teal-blue'} `}>
                        <GroupIcon className="mr-2" />
                        {group.name}
                    </p>
                    <p className={`text-sm ${isJoined ? 'text-gray-600' : 'text-teal-blue'
                        }`}>
                        {group.members.length} Members
                    </p>
                </div>
                <p className={`text-gray-500 ${isJoined ? 'text-gray-600' : 'text-teal-blue'
                    } mb-3`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dolor vitae risus cursus vestibulum.
                </p>
            </Link>
            <div className="flex justify-between items-center">
                {
                    (group.admin as User)?._id?.toString() != loggedUser?._id?.toString() &&
                    <>
                        {isJoined ? (
                            <button onClick={handleLeaveGroup} className="text-red-500 hover:text-red-700">
                                Leave Group <ExitToApp className="ml-1" />
                            </button>
                        ) : (
                            <button onClick={handleJoinGroup} className={`text-teal-blue hover:text-teal-blue-dark ${isJoined ? 'text-gray-600 cursor-default' : ''}`}>
                                {isJoined ? 'Joined' : 'Join Group'}{' '}
                                {isJoined ? <CheckCircle className="ml-1" /> : null}
                            </button>
                        )}
                    </>
                }
            </div>
        </div>
    );
};

export default GroupCard;
