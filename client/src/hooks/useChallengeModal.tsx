import { create } from 'zustand'
import { Challenge } from '../interfaces'

interface Props {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    onSetChallenge: (challenge: Challenge) => void,
    challenge: Challenge | null
}

export const useChallengeModal = create<Props>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onSetChallenge: (challenge: Challenge) => set({ challenge }),
    challenge: null
}))