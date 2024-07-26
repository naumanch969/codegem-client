import React from 'react';
import { Link } from 'react-router-dom';
import { Group as GroupIcon, CheckCircle, ExitToApp } from '@mui/icons-material';
import { Group, User } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { joinGroup, leaveGroup } from '../../redux/actions/group';
import { RootState } from '../../redux/store';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';

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
        <Card className={`bg-light-gray-light rounded transition-transform transform hover:scale-105 ${isJoined ? 'bg-white' : 'bg-light-gray'}`}>

            <CardContent className='p-4 pb-0 ' >
                <Link to={`/groups/${group._id}`} className="block">
                    <div className="flex justify-between items-center mb-3">
                        <CardTitle className={`text-lg font-semibold capitalize flex items-center w-full ${isJoined ? 'text-gray-800' : 'text-copper'} `}>
                            <GroupIcon className="mr-2" style={{ fontSize: '2rem' }} />
                            {group.name}
                        </CardTitle>
                        <div className={`text-sm w-28 text-end ${isJoined ? 'text-muted-foreground' : 'text-copper'
                            }`}>
                            {group.members.length} Members
                        </div>
                    </div>
                    <CardDescription className={`text-foreground mb-3`}>
                        {group.description.charAt(0).toUpperCase() + group.description.slice(1)}
                    </CardDescription>
                </Link>

            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 pt-0 ">
                <div className="flex justify-start flex-wrap gap-1">
                    {
                        (group.languages.length > 3 ? group.languages.slice(0, 3) : group.languages).map((l, index) => (
                            <span className='text-muted-foreground italic' key={index} >#{l} </span>
                        ))
                    }
                    {
                        (group.categories.length > 2 ? group.categories.slice(0, 2) : group.categories).map((l, index) => (
                            <span className='text-muted-foreground italic' key={index} >#{l} </span>
                        ))
                    }
                </div>
                <div className="">
                    {
                        (group.admin as User)?._id?.toString() != loggedUser?._id?.toString() &&
                        <>
                            {!isJoined &&
                                <button onClick={handleJoinGroup} className={`text-copper hover:text-copper-dark ${isJoined ? 'text-muted-foreground cursor-default' : ''}`}>
                                    {isJoined ? 'Joined' : 'Join Group'}{' '}
                                    {isJoined ? <CheckCircle className="ml-1" /> : null}
                                </button>
                            }
                        </>
                    }
                </div>
            </CardFooter>

        </Card>
    );
};

export default GroupCard;


GroupCard.Skeleton = function () {
    return (
        <div className={`h-44 w-full animate-pulse flex flex-col justify-between p-4 border rounded shadow-lg bg-light-gray`}>
            <div>
                <div className="flex flex-col justify-between items-center mb-3 w-full h-full ">
                    <div className={`flex justify-start items-center w-full `}>
                        <GroupIcon className="mr-2" style={{ fontSize: '2rem' }} />
                        <span className={`h-4 w-full bg-warm-gray-dark rounded `} />
                    </div>
                    <div className="flex flex-col gap-y-2 w-full ">
                        <p className={`h-4 w-full bg-warm-gray-dark rounded `} />
                        <p className={`h-4 w-full bg-warm-gray-dark rounded `} />
                        <p className={`h-4 w-full bg-warm-gray-dark rounded `} />
                        <p className={`h-4 w-[50%] bg-warm-gray-dark rounded `} />
                    </div>
                </div>
            </div>
        </div>
    )
}