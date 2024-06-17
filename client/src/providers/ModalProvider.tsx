import CreateChallenge from '@/pages/Challenge/Create'
import CreateCode from '@/pages/Codes/Create'
import CreateCollection from '@/pages/Collections/Create'
import CreateGroup from '@/pages/Groups/Create'
import { BioModal } from '@/pages/More/Modals/Account/BioModal'
import { EmailModal } from '@/pages/More/Modals/Account/EmailModal'
import { FullNameModal } from '@/pages/More/Modals/Account/FullNameModal'
import { LocationModal } from '@/pages/More/Modals/Account/LocationModal'
import { UsernameModal } from '@/pages/More/Modals/Account/UsernameModal'
import { BlockUsersModal } from '@/pages/More/Modals/Privacy/BlockUsersModal'
import { ProfileVisibilityModal } from '@/pages/More/Modals/Privacy/ProfileVisibilityModal'
import { WhoCanSeeMyFriendsListModal } from '@/pages/More/Modals/Privacy/WhoCanSeeMyFriendsListModal'
import { WhoCanSeeMyPostsModal } from '@/pages/More/Modals/Privacy/WhoCanSeeMyPostsModal'
import { WhoCanSendFriendRequestsModal } from '@/pages/More/Modals/Privacy/WhoCanSendFriendRequestsModal'
import { WhoCanTagMeInPostsModal } from '@/pages/More/Modals/Privacy/WhoCanTagMeInPostsModal'
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

            <UsernameModal />
            <FullNameModal />
            <EmailModal />
            <LocationModal />
            <BioModal />

            <BlockUsersModal />
            <ProfileVisibilityModal />
            <WhoCanSeeMyFriendsListModal />
            <WhoCanSeeMyPostsModal />
            <WhoCanSendFriendRequestsModal />
            <WhoCanTagMeInPostsModal />

        </>
    )
}