import { create } from 'zustand'

interface Props {
    role: 'User' | 'Admin',
    onSetRole: (role: 'User' | 'Admin') => void
}

export const useRole = create<Props>((set) => ({
    role: 'User',
    onSetRole: (role: 'User' | 'Admin') => set({ role })
}))