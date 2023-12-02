import { VisibilityOff, RemoveRedEye } from '@mui/icons-material'
import React, { useState } from 'react';

const Input = ({ type, placeholder, attribute, blurFunction, showEyeIcon, formData, setFormData }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [attribute]: e.target.value });
    }

    return (
        <div className="flex flex-col gap-4 w-full relative ">
            <input
                autoComplete="off"
                type={showPassword ? 'text' : type}
                placeholder={placeholder}
                name={attribute}
                value={formData[attribute]}
                onChange={handleChange}
                onBlur={blurFunction}
                className="w-full placeholder-cool-gray text-cool-gray text-blac border-b-2 border-cool-gray bg-white p-2 text-sm rounded outline-none"
                required
            />
            {showEyeIcon && (
                <button
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-0 top-[50%] transform -translate-y-1/2"
                >
                    {showPassword ? <VisibilityOff /> : <RemoveRedEye />}
                </button>
            )}
        </div>
    );
};

export default Input;
