import CreateChallenge from '@/pages/Challenge/Create'
import UpdateChallenge from '@/pages/Challenge/Update'
import CreateCode from '@/pages/Codes/Create'
import UpdateCode from '@/pages/Codes/Update'
import CreateCollection from '@/pages/Collections/Create'
import UpdateCollection from '@/pages/Collections/Update'
import CreateGroup from '@/pages/Groups/Create'
import UpdateGroup from '@/pages/Groups/Update'
import CreateStreak from '@/pages/Streak/Create'
import UpdateStreak from '@/pages/Streak/Update'
import React from 'react'

export const ModalProvider = () => {
    return (
        <>
            <CreateCode />
            <UpdateCode />
            <CreateStreak />
            <UpdateStreak />
            <CreateChallenge />
            <UpdateChallenge />
            <CreateCollection />
            <UpdateCollection />
            <CreateGroup />
            <UpdateGroup />
        </>
    )
}