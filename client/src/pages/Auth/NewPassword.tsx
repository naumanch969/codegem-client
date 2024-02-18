import React, { FC, ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNewPassword } from '../../redux/actions/auth';
import { logo } from "../../assets";
import { RootState } from "../../redux/store";

const NewPassword = ({ snackbarText, setSnackbarText }: { snackbarText?: string, setSnackbarText?: any }) => {

  //////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////
  const { isFetching } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //////////////////////////////////////////////////// STATES /////////////////////////////////////////////////////
  const [password, setPassword] = useState<{ password: string, confirmPassword: string }>({ password: '', confirmPassword: '' });

  //////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password.password !== password.confirmPassword) return alert('Password and Confirm Password should be same.');

    dispatch<any>(setNewPassword(password.password, navigate, setSnackbarText))
    setPassword({ confirmPassword: '', password: '' })
  };


  return (
    <div className="w-full flex justify-center items-center ">

      <div className="w-full h-screen ">
        <div className="flex justify-center pt-16">
          <img className="h-32" src={logo} />
        </div>
        <div className="flex justify-center pt-6 pl-0 ml-0 rounded-lg">
          <div className="w-96 h-auto shadow-xl rounded bg-white">
            <p className="text-xl text-slate-500 tracking-wide flex justify-center pt-6">
              Forgot Password
            </p>
            <p className="flex justify-center text-center pt-2 font-Mulish text-slate-500 text-xs px-10">
              Enter your new password below. Then press the "Reset Password" button. Then you will be able to log in with your new password.
            </p>
            <form className="flex flex-col gap-[10px] w-auto pl-[2rem] pt-[2rem] ">
              <div className="flex flex-col gap-8">
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={password.password}
                  onChange={handleInputChange}
                  className="w-[20rem] h-[40px] px-[8px] font-primary"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  value={password.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="w-[20rem] h-[40px] px-[8px] font-primary"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>
              <br />
              <button onClick={handleSubmit} className={`w-[20rem] bg-dark-slate-blue hover:bg-dark-slate-blue-lighten p-2 rounded-lg transition-all text-white font-medium tracking-wider `}>
                {isFetching ? 'Processing...' : 'Reset Password'}
              </button>
              <div className="font-primary font-light text-slate-500 flex justify-center p-2 pr-7">
                <Link to="/auth/verify_email" className="text-sky-400 hover:text-sky-600">
                  Go Back
                </Link>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
