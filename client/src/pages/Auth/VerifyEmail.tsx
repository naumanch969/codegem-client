import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOTP } from "../../redux/reducers/authSlice";
import { logo } from '../../assets'
import { RootState } from "../../redux/store";


const VerifyEmail = () => {

  ////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();

  ////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////
  const [email, setEmail] = useState<string>("");
  const [isFetching, setIsFetching] = useState(false)

  ////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsFetching(true)
    dispatch<any>(sendOTP(email))
      .then(() => {
        localStorage.setItem("email", JSON.stringify({ email }));
        navigate('/auth/verify_otp')
        setEmail("");
      })
      .finally(() => {
        setIsFetching(false)
      })

  };


  return (
    <div className="font-primary flex justify-center items-center w-full h-full ">

      <div className="w-full h-screen ">
        <div className="flex justify-center pt-16">
          <img className="h-32" src={logo} alt='Logo' />
        </div>
        <div className="flex justify-center pt-6 pl-0 ml-0 rounded-lg">
          <div className="w-96 h-auto shadow-xl rounded bg-white">
            <p className="text-xl text-slate-500 tracking-wide flex justify-center pt-6">
              Forgot Password
            </p>
            <p className="flex justify-center text-center pt-2 font-Mulish text-slate-500 text-xs px-10">
              Enter your email address below and we'll send you a link to reset your password.
            </p>
            <div className="flex flex-col gap-[10px] w-auto pl-[2rem] pt-[2rem] ">
              <div className="flex flex-col gap-8">
                <Input
                  type="string"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Enter Your Email Here"
                  className="w-[20rem] h-[40px] px-[8px] font-primary"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>
              <br />
              <button
                onClick={handleSubmit}
                className={`w-[20rem] bg-dark-slate-blue hover:bg-dark-slate-blue-lighten p-2 rounded-lg transition-all text-white font-medium tracking-wider `}
              >
                {isFetching ? 'Sending...' : 'Send Code'}
              </button>
              <div className="font-primary font-light text-slate-500 flex justify-center p-2 pr-7">
                <Link to="/auth/login" className="text-sky-400 hover:text-sky-600">
                  Go Back
                </Link>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
