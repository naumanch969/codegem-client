import { create } from 'zustand'
import { Code } from '../interfaces'

interface Props {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    collectionId: string,
    groupId: string,
    onSetCode: (code: Code | null) => void,
    onSetGroupId: (groupId: string) => void,
    onSetCollectionId: (collectionId: string) => void,
    code: Code | null
}

export const useCodeModal = create<Props>((set) => ({
    isOpen: false,
    collectionId: '',
    groupId: '',
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onSetCollectionId: (collectionId: string) => set({ collectionId }),
    onSetGroupId: (collectionId: string) => set({ collectionId }),
    onSetCode: (code: Code | null) => set({ code }),
    code: null
}))