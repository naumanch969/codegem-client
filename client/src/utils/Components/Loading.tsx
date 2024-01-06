import React from 'react'
import { CircularProgress } from '@mui/material'

const Loading = () => {
    return (
        <CircularProgress style={{ width: '60px', height: '60px', color: '#751ACF' }} className="text-orange  " />
    )
}
export default Loading;