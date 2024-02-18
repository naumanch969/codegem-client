import React, { useState } from 'react'
import { AlternateEmail, Info, LocationOn, Person, VerifiedUser } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { User } from '../../../interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { PersonalDetails } from '../Modals/PersonalDetails'
import { BasicInfo } from '../Modals/BasicInfo'

const About = () => {

  const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)

  const [openPersonalDetail, setOpenPersonalDetail] = useState<boolean>(false)
  const [openBasicInfo, setOpenBasicInfo] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const onOpen = (t: string, d: string) => {
    setOpenPersonalDetail(true)
    setTitle(t)
    setDescription(d)
  }

  return (
    <>
      <BasicInfo
        isOpen={openBasicInfo}
        onClose={() => setOpenBasicInfo(false)}
      />
      <PersonalDetails
        title={title}
        description={description}
        isOpen={openPersonalDetail}
        onClose={() => setOpenPersonalDetail(false)}
      />

      <Card className="bg-white p-4 rounded shadow-md  ">
        <div className="grid grid-cols-2 gap-4">
          <CardContent className="col-span-1">
            <div className="flex justify-between items-">
              <CardTitle className="text-md font-semibold mb-4">Basic Info</CardTitle>
              <Button onClick={() => setOpenBasicInfo(true)} variant='outline' size='sm' className='flex items-center gap-2 ' ><Pencil className='w-3 h-3' /> Edit Info</Button>
            </div>
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
              <Tooltip placement='top' title="Title" arrow>
                <Info className="text-cool-gray mr-2" />
              </Tooltip>
              <p className="text-cool-gray">{loggedUser?.title}.</p>
            </div>
            <div className="flex items-center mb-2">
              <Tooltip placement='top' title="Location" arrow>
                <LocationOn className="text-cool-gray mr-2" />
              </Tooltip>
              <p className="text-cool-gray">{loggedUser?.location}</p>
            </div>
          </CardContent>

          <CardContent className="col-span-1">
            <CardTitle className="text-md font-semibold mb-4">Personal Details</CardTitle>

            <div className="flex justify-between items-center bg-background hover:bg-secondary p-2 rounded-lg group ">
              <div className="flex flex-col justify-between items-start">
                <h3 className="text-md font-semibold mb-1">Interests</h3>
                <p className="text-cool-gray">{loggedUser?.interests?.map((i, index) => <span key={index} >{i} {loggedUser?.interests?.length != index + 1 && ', '} </span>)}</p>
              </div>
              <Button onClick={() => onOpen('Interests', 'Edit your interests.')} variant='outline' size='sm' className='hidden group-hover:block ' ><Pencil className='w-3 h-3' /></Button>
            </div>
            <div className="flex justify-between items-center bg-background hover:bg-secondary p-2 rounded-lg group ">
              <div className="flex flex-col justify-between items-start">
                <h3 className="text-md font-semibold mb-1">Hobbies</h3>
                <p className="text-cool-gray">{loggedUser?.hobbies?.map((i, index) => <span key={index} >{i} {loggedUser?.hobbies?.length != index + 1 && ', '} </span>)}</p>
              </div>
              <Button onClick={() => onOpen('Hobbies', 'Edit your hobbies.')} variant='outline' size='sm' className='hidden group-hover:block ' ><Pencil className='w-3 h-3' /></Button>
            </div>
            <div className="flex justify-between items-center bg-background hover:bg-secondary p-2 rounded-lg group ">
              <div className="flex flex-col justify-between items-start">
                <h3 className="text-md font-semibold mb-1">Favorite Books</h3>
                <p className="text-cool-gray">{loggedUser?.books?.map((i, index) => <span key={index} >{i} {loggedUser?.books?.length != index + 1 && ', '} </span>)}</p>
              </div>
              <Button onClick={() => onOpen('Books', 'Edit your favorite books.')} variant='outline' size='sm' className='hidden group-hover:block ' ><Pencil className='w-3 h-3' /></Button>
            </div>
            <div className="flex justify-between items-center bg-background hover:bg-secondary p-2 rounded-lg group ">
              <div className="flex flex-col justify-between items-start">
                <h3 className="text-md font-semibold mb-1">Programming Languages</h3>
                <p className="text-cool-gray">{loggedUser?.programming?.map((i, index) => <span key={index} >{i} {loggedUser?.programming?.length != index + 1 && ', '} </span>)}</p>
              </div>
              <Button onClick={() => onOpen('Programming Languages', 'Edit your familiar programming languages.')} variant='outline' size='sm' className='hidden group-hover:block ' ><Pencil className='w-3 h-3' /></Button>
            </div>
          </CardContent>
        </div>
      </Card >
    </>
  )
}

export default About