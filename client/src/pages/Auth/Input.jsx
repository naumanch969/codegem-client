import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import {motion} from 'framer-motion'
import { VisibilityOff, RemoveRedEye } from '@mui/icons-material'

const Input = ({ type, placeholder, attribute, blurFunction, showEyeIcon ,data, setData }) => {      // attribute may either of 'email', 'name', 'password', 'confirmPassword'

    const [showPassword, setShowPassword] = useState(false)


    const handleChange = (e) => {
        setData({ ...data, [attribute]: e.target.value })
    }

    return (
        <div className="flex flex-col gap-[4px] w-full " >

            <div className="relative flex flex-col gap-[4px] " >
                <input
                    autoComplete='off'
                    type={showPassword ? 'text' : type}
                    placeholder={placeholder}
                    name={attribute}
                    value={data[attribute]}
                    onChange={handleChange}
                    onBlur={blurFunction}
                    className='w-full placeholder-emerald-800 text-emerald-800 border-b-[1px] border-emerald-800 bg-neutral-800 p-[8px] text-[14px] rounded-[4px] outline-none  '
                    required
                />
                {
                    showEyeIcon &&
                    <button onClick={() => setShowPassword(pre => !pre)} className="absolute right-0 top-[50%] transform translate-y-[-50%] " > {showPassword ? <VisibilityOff /> : <RemoveRedEye />}  </button>
                }
            </div>

        </div>
    )

}

export default Input