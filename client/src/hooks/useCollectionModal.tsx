import { create } from 'zustand'
import { Collection } from '../interfaces'

interface Props {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    onSetCollection: (collection: Collection) => void,
    collection: Collection | null
}

export const useCollectionModal = create<Props>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onSetCollection: (collection: Collection) => set({ collection }),
    collection: null
}))