import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Add, Favorite, Folder, Search } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import Group from '../../Groups/GroupCard';

const Groups = () => {
  const sampleGroupsData = [
    { id: 1, name: 'Web Developers', members: 1, isJoined: true },
    { id: 3, name: 'JavaScript Lovers', members: 3, isJoined: true },
    { id: 5, name: 'Data Science Experts', members: 5, isJoined: true },
    { id: 7, name: 'Backend Ninjas', members: 7, isJoined: true },
    { id: 9, name: 'AI Enthusiasts', members: 9, isJoined: true },
    { id: 11, name: 'Mobile App Devs', members: 1111, isJoined: true },
    { id: 13, name: 'Full Stack Gurus', members: 1313, isJoined: true },
    { id: 15, name: 'Open Source Advocates', members: 1515, isJoined: true },
    { id: 17, name: 'Networking Geeks', members: 1717, isJoined: true },
    { id: 19, name: 'Startup Founders', members: 1919, isJoined: true },
    { id: 21, name: 'Artificial Intelligence', members: 2121, isJoined: true },
    { id: 23, name: 'Big Data Analytics', members: 2323, isJoined: true },
    { id: 25, name: 'DevOps Masters', members: 2525, isJoined: true },
    { id: 27, name: 'Tech Enthusiasts', members: 2727, isJoined: true },
    { id: 29, name: 'Gaming Community', members: 2929, isJoined: true },
];


  return (

    <div className="w-full flex flex-col gap-[2rem] ">
      {/* Your Collections */}
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold mb-6 text-dark-slate-blue">Your Groups</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleGroupsData.map((group, index) => (
            <Group group={group} key={index} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Groups;