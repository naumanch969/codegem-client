import { SettingParentField, SettingSubField } from '@/enums';
import { create } from 'zustand'

interface AccountModals {
    username: boolean;
    fullName: boolean;
    email: boolean;
    location: boolean;
    bio: boolean;
}
interface PrivacyModals {
    profileVisibility: boolean;
    whoCanSendFriendRequests: boolean;
    whoCanSeeMyFriendsList: boolean;
    whoCanSeeMyPosts: boolean;
    whoCanTagMeInPosts: boolean;
    blockUsers: boolean;
}
interface NotificationModals {
    emailNotifications: boolean;
    pushNotifications: boolean;
    manageNotificationPreferences: boolean;
}
interface ThemeAndDisplayModals {
    mode: boolean;
    adjustFontSize: boolean;
}
interface ConnectedAccountsModals {
    facebook: boolean;
    twitter: boolean;
    github: boolean;
}
interface AccessibilityModals {
    enableAccessibilityFeatures: boolean;
}
interface IsOpenState {
    account: AccountModals;
    privacy: PrivacyModals;
    notification: NotificationModals;
    themeAndDisplay: ThemeAndDisplayModals;
    connectedAccounts: ConnectedAccountsModals;
    accessibility: AccessibilityModals;
}

interface Props {
    isOpen: IsOpenState;
    onOpen: (parentField: SettingParentField, field: SettingSubField) => void;
    onClose: (parentField: SettingParentField, field: SettingSubField) => void;
}

export const useSettingModals = create<Props>((set, get) => ({
    isOpen: {
        account: { username: false, fullName: false, email: false, location: false, bio: false, },
        privacy: { profileVisibility: false, whoCanSendFriendRequests: false, whoCanSeeMyFriendsList: false, whoCanSeeMyPosts: false, whoCanTagMeInPosts: false, blockUsers: false },
        notification: { emailNotifications: false, pushNotifications: false, manageNotificationPreferences: false },
        themeAndDisplay: { mode: false, adjustFontSize: false },
        connectedAccounts: { facebook: false, twitter: false, github: false },
        accessibility: { enableAccessibilityFeatures: false },
    },
    onOpen: (parentField, field) => {
        const currentIsOpen = get().isOpen;
        set({ isOpen: { ...currentIsOpen, [parentField]: { ...currentIsOpen[parentField], [field]: true, } } });
    },
    onClose: (parentField, field) => {
        const currentIsOpen = get().isOpen;
        set({ isOpen: { ...currentIsOpen, [parentField]: { ...currentIsOpen[parentField], [field]: false, } } });
    },
}));
