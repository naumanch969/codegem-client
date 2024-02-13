import { create } from 'zustand'
import { Code } from '../interfaces'

interface Props {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    onSetCode: (code: Code) => void,
    code: Code | null
}

export const useCodeModal = create<Props>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onSetCode: (code: Code) => set({ code }),
    code: null
}))