import React from 'react'
import Loader from './Loader'

type Props = {
    loading?: boolean,
    text: String,
    size?: 'lg' | 'md' | 'sm',
    disabled?: boolean,
    onClick?: (e?: any) => void,
    type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info',
    variant?: 'filled' | 'outlined' | 'text',
}

const Button = ({ loading = false, text, size = 'md', disabled = false, onClick, type = 'primary', variant = 'filled' }: Props) => {

    const baseStyle = 'rounded-[4px] cursor-pointer disabled:bg-opacity-70 disabled:cursor-not-allowed';

    const sizeStyle = size === 'lg' ? 'px-6 py-4 text-xl' : size === 'md' ? 'px-4 py-3 text-base' : 'px-3 py-2 text-sm';
    const typeStyle = {
        primary: 'bg-dark-slate-blue  text-white hover:bg-dark-slate-blue ',
        secondary: 'bg-teal-blue  text-white hover:bg-teal-blue -darken',
        success: 'bg-green-500 text-white hover:bg-green-darken',
        danger: 'bg-red-500 text-white hover:bg-red-darken',
        warning: 'bg-orange-500 text-white hover:bg-orange-darken',
        info: 'bg-light-blue text-white hover:bg-light-blue-darken',
    }[type];

    const variantStyle = {
        filled: typeStyle,
        outlined: `border border-solid bg-white text-${typeStyle.split(' ')[0]} hover:text-${typeStyle.split(' ')[0]} `,
        text: `text-${typeStyle.split(' ')[0]} bg-white hover:bg-light-gray `,
    }[variant];

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`${baseStyle} ${sizeStyle} ${variantStyle}`}
        >
            {loading ? <Loader /> : text}
        </button>
    )
}

export default Button
