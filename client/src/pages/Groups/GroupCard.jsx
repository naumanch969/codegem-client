import React from 'react';
import { Link } from 'react-router-dom';
import { Group, CheckCircle, ExitToApp } from '@mui/icons-material';

const GroupCard = ({ group, onToggleMembership }) => {
    const { id, name, members, isJoined } = group;

    return (
        <div className={`flex flex-col justify-between p-4 border rounded shadow-lg ${isJoined ? 'bg-white' : 'bg-light-gray'
            } hover:scale-105 transition-all duration-300`}>
            <Link to={`/groups/${id}`} className="block">
                <div className="flex justify-between items-center mb-3">
                    <p className={`text-lg font-semibold ${isJoined ? 'text-gray-800' : 'text-teal-blue'
                        }`}>
                        <Group className="mr-2" />
                        {name}
                    </p>
                    <p className={`text-sm ${isJoined ? 'text-gray-600' : 'text-teal-blue'
                        }`}>
                        {members} Members
                    </p>
                </div>
                <p className={`text-gray-500 ${isJoined ? 'text-gray-600' : 'text-teal-blue'
                    } mb-3`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dolor vitae risus cursus vestibulum.
                </p>
            </Link>
            <div className="flex justify-between items-center">
                {isJoined ? (
                    <button
                        className="text-red-500 hover:text-red-700"
                        onClick={onToggleMembership}
                    >
                        Leave Group <ExitToApp className="ml-1" />
                    </button>
                ) : (
                    <button
                        className={`text-teal-blue hover:text-teal-blue-dark ${isJoined ? 'text-gray-600 cursor-default' : ''
                            }`}
                        onClick={onToggleMembership}
                    >
                        {isJoined ? 'Joined' : 'Join Group'}{' '}
                        {isJoined ? <CheckCircle className="ml-1" /> : null}
                    </button>
                )}
            </div>
        </div>
    );
};

export default GroupCard;
