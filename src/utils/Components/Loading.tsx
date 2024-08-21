import React from 'react'
import { CircularProgress } from '@mui/material'

const Loading = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    return (
        <CircularProgress style={{
            width: size == 'sm' ? '18px' : size == 'md' ? '36p' : '60px',
            height: size == 'sm' ? '18px' : size == 'md' ? '36p' : '60px',
            color: '#00A5B5'
        }} className="text-orange  " />
    )
}
export default Loading;