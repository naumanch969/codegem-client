import { create } from 'zustand'
import { Challenge } from '../interfaces'

interface Props {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    onSetChallenge: (challenge: Challenge | null) => void,
    challenge: Challenge | null
}

export const useChallengeModal = create<Props>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onSetChallenge: (challenge: Challenge | null) => set({ challenge }),
    challenge: null
}))