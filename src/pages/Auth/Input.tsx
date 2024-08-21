import React, { ChangeEvent, FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { VisibilityOff, RemoveRedEye } from '@mui/icons-material';

interface InputProps {
  type: string;
  placeholder: string;
  attribute: string;
  blurFunction: () => void;
  showEyeIcon: boolean;
  data: { [key: string]: string };
  setData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const Input: FC<InputProps> = ({ type, placeholder, attribute, blurFunction, showEyeIcon, data, setData }) => {

  /////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  /////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [attribute]: e.target.value });
  };
  
  /////////////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////
  return (
    <div className="flex flex-col gap-1w-full">
      <div className="relative flex flex-col gap-[4px]">
        <input
          autoComplete="off"
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          name={attribute}
          value={data[attribute]}
          onChange={handleChange}
          onBlur={blurFunction}
          className="w-full placeholder-emerald-800 text-emerald-800 border-b-[1px] border-emerald-800 bg-neutral-800 p-[8px] text-[14px] rounded-[4px] outline-none"
          required
        />
        {showEyeIcon && (
          <button onClick={() => setShowPassword((prev) => !prev)} className="absolute right-0 top-[50%] transform translate-y-[-50%]">
            {showPassword ? <VisibilityOff /> : <RemoveRedEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
