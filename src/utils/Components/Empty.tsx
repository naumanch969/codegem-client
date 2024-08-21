import { empty } from '@/assets'
import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
    title?: string
    description?: string
    className?: string
}

export const Empty = ({ className, title, description }: Props) => {
    return (
        <div className={cn('w-full flex flex-col justify-center items-center grayscale ', className)}>
            <img src={empty} alt='Empty' className='w-96 h-96 grayscale ' />
            <span className='text-foreground text-center text-lg font-semibold ' >{title ? title : 'Nothing Found.'}</span>
            <span className='text-muted-foreground text-center text-md ' >{description ? description : 'It\'s our fault not yours.'}</span>
        </div>
    )
}
