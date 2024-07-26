import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { verifyRegisterationEmail, resendOTP } from "../../redux/reducers/authSlice";
import { logo } from "../../assets";
import { ArrowBack } from "@mui/icons-material";
import Cookies from "js-cookie";

const InputRegisterationOTP = () => {

    /////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [otp, setOtp] = useState<string>("");
    const [isFetching, setIsFetching] = useState(false)

    /////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////

    /////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (otp.length != 5) return alert('Please enter a valid OTP')

        setIsFetching(true)
        dispatch<any>(verifyRegisterationEmail(otp))
            .then(() => {
                const connect = Cookies.get("code.connect");
                connect ? navigate("/") : navigate("/auth/login");

                localStorage.removeItem("email");
            })
            .finally(() => {
                setIsFetching(false)
            })
    }
    const goBack = () => {
        navigate(-1)
    }
    const handleResend = (e: any) => {
        e.preventDefault();
        dispatch<any>(resendOTP())
    }

    /////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////
    return (
        <div className="w-full flex flex-col justify-center items-center ">
            <div className="w-full h-screen ">
                <div className="flex justify-center pt-16">
                    <img className="h-32" src={logo} alt='Logo' />
                </div>
                <div className="flex justify-center pt-6 pl-0 ml-0 rounded-lg">
                    <div className="w-[26rem] h-auto flex flex-col gap-6 shadow-xl rounded bg-white px-[2rem] py-[2rem] ">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-start items-center w-full ">
                                <button title='Go Back' onClick={goBack} className="text-sky-400 hover:text-sky-600">
                                    <ArrowBack />
                                </button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-xl text-slate-500 tracking-wide flex justify-center">
                                    Verify Your Email
                                </h2>
                                <p className="flex justify-center text-center font-Mulish text-slate-500 text-xs">
                                    We have sent a code to your email. Please enter the code below to reset your
                                    password.
                                </p>
                            </div>
                        </div>
                        <form className="flex flex-col gap-6 w-auto ">
                            <div className="flex justify-center items-center w-full">
                                <OTPInput
                                    value={otp}
                                    onChange={(o) => setOtp(o)}
                                    numInputs={5}
                                    inputType="number"
                                    renderSeparator={<span className="mx-1"> </span>}
                                    renderInput={(props) => (
                                        <div className="md:w-16 md:h-16 w-12 h-12">
                                            <input
                                                {...props}
                                                style={{}}
                                                className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                type="text"
                                            />
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-center gap-4">
                                    <button onClick={handleSubmit} className={`w-2/4 bg-blackish hover:bg-blackish-lighten p-2 rounded-lg transition-all text-white font-medium tracking-wider `}>
                                        {isFetching ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                                <div className="font-primary font-light text-slate-500 flex justify-center ">
                                    <button onClick={handleResend} className="text-sky-400 hover:text-sky-600">
                                        Resend
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default InputRegisterationOTP;
