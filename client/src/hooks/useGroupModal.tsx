import { create } from 'zustand'
import { Group } from '../interfaces'

interface Props {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    onSetGroup: (group: Group) => void,
    group: Group | null
}

export const useGroupModal = create<Props>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onSetGroup: (group: Group) => set({ group }),
    group: null
}))