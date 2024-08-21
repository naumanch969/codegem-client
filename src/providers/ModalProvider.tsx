import CreateChallenge from '@/pages/Challenge/Create'
import CreateCode from '@/pages/Codes/Create'
import CreateCollection from '@/pages/Collections/Create'
import CreateGroup from '@/pages/Groups/Create'
import { EnableAccessibilityFeaturesModal } from '@/pages/More/Modals/Accessibility/EnableAccessibilityFeaturesModal'
import { BioModal } from '@/pages/More/Modals/Account/BioModal'
import { EmailModal } from '@/pages/More/Modals/Account/EmailModal'
import { FullNameModal } from '@/pages/More/Modals/Account/FullNameModal'
import { LocationModal } from '@/pages/More/Modals/Account/LocationModal'
import { UsernameModal } from '@/pages/More/Modals/Account/UsernameModal'
import { FacebookModal } from '@/pages/More/Modals/ConnectedAccounts/FacebookModal'
import { GithubModal } from '@/pages/More/Modals/ConnectedAccounts/GithubModal'
import { TwitterModal } from '@/pages/More/Modals/ConnectedAccounts/TwitterModal'
import { EmailNotificationsModal } from '@/pages/More/Modals/Notification/EmailNotificationModal'
import { PushNotificationsModal } from '@/pages/More/Modals/Notification/PushNotification'
import { BlockUsersModal } from '@/pages/More/Modals/Privacy/BlockUsersModal'
import { ProfileVisibilityModal } from '@/pages/More/Modals/Privacy/ProfileVisibilityModal'
import { WhoCanSeeMyFriendsListModal } from '@/pages/More/Modals/Privacy/WhoCanSeeMyFriendsListModal'
import { WhoCanSeeMyPostsModal } from '@/pages/More/Modals/Privacy/WhoCanSeeMyPostsModal'
import { WhoCanSendFriendRequestsModal } from '@/pages/More/Modals/Privacy/WhoCanSendFriendRequestsModal'
import { WhoCanTagMeInPostsModal } from '@/pages/More/Modals/Privacy/WhoCanTagMeInPostsModal'
import { AdjustFontSizeModal } from '@/pages/More/Modals/ThemeAndDisplay/AdjustFontSizeModal'
import { ModaModal } from '@/pages/More/Modals/ThemeAndDisplay/ModeModal'
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

            <EmailNotificationsModal />
            <PushNotificationsModal />

            <ModaModal />
            <AdjustFontSizeModal />

            <FacebookModal />
            <TwitterModal />
            <GithubModal />

            <EnableAccessibilityFeaturesModal />

        </>
    )
}