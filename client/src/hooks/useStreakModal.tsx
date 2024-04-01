import { create } from 'zustand'
import { Streak } from '../interfaces'

interface Props {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    collectionId: string,
    groupId: string,
    onSetStreak: (streak: Streak | null) => void,
    onSetGroupId: (groupId: string) => void,
    onSetCollectionId: (collectionId: string) => void,
    streak: Streak | null
}

export const useStreakModal = create<Props>((set) => ({
    isOpen: false,
    collectionId: '',
    groupId: '',
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onSetCollectionId: (collectionId: string) => set({ collectionId }),
    onSetGroupId: (groupId: string) => set({ groupId }),
    onSetStreak: (streak: Streak | null) => set({ streak }),
    streak: null
}))