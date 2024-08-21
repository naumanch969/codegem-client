import React from 'react'
import { Person } from '@mui/icons-material'

const Avatar = ({ src, className, onClick }: { src?: string, className?: string, onClick?: () => void }) => {

    return (
        <div
            onClick={onClick}
            className={`w-[44px] h-[44px] rounded-full cursor-pointer bg-gray-300 flex justify-center items-center ${className!} `}
        >
            {
                src
                    ?
                    <img src={src} alt='image' className="w-full h-full rounded-full " />
                    :
                    <Person style={{ fontSize: '32px' }} className={`text-[32px] text-emerald-500 `} />
            }
        </div>
    )
}

export default Avatar;