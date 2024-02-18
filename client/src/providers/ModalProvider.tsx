import CreateChallenge from '@/pages/Challenge/Create'
import CreateCode from '@/pages/Codes/Create'
import CreateCollection from '@/pages/Collections/Create'
import CreateGroup from '@/pages/Groups/Create'
import CreateStreak from '@/pages/Streak/Create'
import React from 'react'

export const ModalProvider = () => {
    return (
        <>
            <CreateCode />
            <CreateStreak />
            <CreateChallenge />
            <CreateCollection />
            <CreateGroup />
        </>
    )
}