import { create } from 'zustand'
import { Code } from '../interfaces'

interface Props {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    onSetCode: (code: Code | null) => void,
    code: Code | null
}

export const useCodeModal = create<Props>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onSetCode: (code: Code | null) => set({ code }),
    code: null
}))