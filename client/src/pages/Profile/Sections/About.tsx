import React from 'react'
import { AlternateEmail, Info, LocationOn, Person, VerifiedUser } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { User } from '../../../interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

const About = () => {

  const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)


  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <h3 className="text-md font-semibold mb-4">Basic Info</h3>
          <div className="flex items-center mb-2">
            <Tooltip placement='top' title="Username" arrow>
              <VerifiedUser className="text-cool-gray mr-2" />
            </Tooltip>
            <p className="text-cool-gray">{loggedUser?.username}</p>
          </div>
          <div className="flex items-center mb-2">
            <Tooltip placement='top' title="Full Name" arrow>
              <Person className="text-cool-gray mr-2" />
            </Tooltip>
            <p className="text-cool-gray capitalize ">{loggedUser?.firstName} {loggedUser?.lastName}</p>
          </div>
          <div className="flex items-center mb-2">
            <Tooltip placement='top' title="Email" arrow>
              <AlternateEmail className="text-cool-gray mr-2" />
            </Tooltip>
            <p className="text-cool-gray">{loggedUser?.email}</p>
          </div>
          <div className="flex items-center mb-2">
            <Tooltip placement='top' title="Location" arrow>
              <LocationOn className="text-cool-gray mr-2" />
            </Tooltip>
            <p className="text-cool-gray">New York, USA</p>
          </div>
          <div className="flex items-center mb-2">
            <Tooltip placement='top' title="Bio" arrow>
              <Info className="text-cool-gray mr-2" />
            </Tooltip>
            <p className="text-cool-gray">{loggedUser?.title}.</p>
          </div>
        </div>
        <div className="col-span-1">
          <h2 className="text-md font-semibold mb-4">Personal Details</h2>

          <h3 className="text-md font-semibold mb-1">Interests</h3>
          <p className="text-cool-gray">Web development, hiking, photography</p>
          <h3 className="text-md font-semibold mt-4 mb-1">Hobbies</h3>
          <p className="text-cool-gray">Playing guitar, cooking, traveling</p>
          <h3 className="text-md font-semibold mt-4 mb-1">Favorite Books</h3>
          <p className="text-cool-gray">The Alchemist, Harry Potter Series</p>
          <h3 className="text-md font-semibold mt-4 mb-1">Favorite Movies</h3>
          <p className="text-cool-gray">Inception, The Shawshank Redemption</p>
        </div>
      </div>
    </div >
  )
}

export default About