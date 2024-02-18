import React, { useState } from 'react'
import { AlternateEmail, Info, LocationOn, Person, VerifiedUser } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { User } from '../../../interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

const About = () => {

  const { currentUser }: { currentUser: User | null } = useSelector((state: RootState) => state.user)

  return (
    <>

      <Card className="bg-white p-4 rounded shadow-md  ">
        <div className="grid grid-cols-2 gap-4">
          <CardContent className="col-span-1">
            <div className="flex justify-between items-">
              <CardTitle className="text-md font-semibold mb-4">Basic Info</CardTitle>
            </div>
            <div className="flex items-center mb-2">
              <Tooltip placement='top' title="Username" arrow>
                <VerifiedUser className="text-cool-gray mr-2" />
              </Tooltip>
              <p className="text-cool-gray">{currentUser?.username}</p>
            </div>
            <div className="flex items-center mb-2">
              <Tooltip placement='top' title="Full Name" arrow>
                <Person className="text-cool-gray mr-2" />
              </Tooltip>
              <p className="text-cool-gray capitalize ">{currentUser?.firstName} {currentUser?.lastName}</p>
            </div>
            <div className="flex items-center mb-2">
              <Tooltip placement='top' title="Email" arrow>
                <AlternateEmail className="text-cool-gray mr-2" />
              </Tooltip>
              <p className="text-cool-gray">{currentUser?.email}</p>
            </div>
            <div className="flex items-center mb-2">
              <Tooltip placement='top' title="Title" arrow>
                <Info className="text-cool-gray mr-2" />
              </Tooltip>
              <p className="text-cool-gray">{currentUser?.title ?? "Null" }</p>
            </div>
            <div className="flex items-center mb-2">
              <Tooltip placement='top' title="Location" arrow>
                <LocationOn className="text-cool-gray mr-2" />
              </Tooltip>
              <p className="text-cool-gray">{currentUser?.location ?? "Null" }</p>
            </div>
          </CardContent>

          <CardContent className="col-span-1">
            <CardTitle className="text-md font-semibold mb-4">Personal Details</CardTitle>
            <div className="flex flex-col justify-between items-start">
              <h3 className="text-md font-semibold mb-1">Interests</h3>
              <p className="text-cool-gray">
                {currentUser?.interests?.length != 0 ? currentUser?.interests?.map((i, index) => <span key={index} >{i} {currentUser?.interests?.length != index + 1 && ', '}</span>) : "Null"}
              </p>
            </div>
            <div className="flex flex-col justify-between items-start">
              <h3 className="text-md font-semibold mb-1">Hobbies</h3>
              <p className="text-cool-gray">
                {currentUser?.hobbies?.length != 0 ? currentUser?.hobbies?.map((i, index) => <span key={index} >{i} {currentUser?.hobbies?.length != index + 1 && ', '}</span>) : "Null"}
              </p>
            </div>
            <div className="flex flex-col justify-between items-start">
              <h3 className="text-md font-semibold mb-1">Favorite Books</h3>
              <p className="text-cool-gray">
                {currentUser?.books?.length != 0 ? currentUser?.books?.map((i, index) => <span key={index} >{i} {currentUser?.books?.length != index + 1 && ', '}</span>) : "Null"}
              </p>
            </div>
            <div className="flex flex-col justify-between items-start">
              <h3 className="text-md font-semibold mb-1">Programming Languages</h3>
              <p className="text-cool-gray">
                {currentUser?.programming?.length != 0 ? currentUser?.programming?.map((i, index) => <span key={index} >{i} {currentUser?.programming?.length != index + 1 && ', '}</span>) : "Null"}
              </p>
            </div>
          </CardContent>
        </div>
      </Card >
    </>
  )
}

export default About