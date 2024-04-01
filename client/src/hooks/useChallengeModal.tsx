import { create } from 'zustand'
import { Challenge } from '../interfaces'

interface Props {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    collectionId: string,
    groupId: string,
    onSetChallenge: (challenge: Challenge | null) => void,
    onSetGroupId: (groupId: string) => void,
    onSetCollectionId: (collectionId: string) => void,
    challenge: Challenge | null
}

export const useChallengeModal = create<Props>((set) => ({
    isOpen: false,
    collectionId: '',
    groupId: '',
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onSetCollectionId: (collectionId: string) => set({ collectionId }),
    onSetGroupId: (groupId: string) => set({ groupId }),
    onSetChallenge: (challenge: Challenge | null) => set({ challenge }),
    challenge: null
}))