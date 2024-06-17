import React, { useState, FormEvent } from "react";
import { Input } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/reducers/authSlice";
import { logo } from "../../assets";


const ChangePassword = ({ setOpen, setSnackbarText }: { setOpen?: any, setSnackbarText?: any }) => {

    ////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////
    const PasswordButtonInitialStyle = { opacity: 0 };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isFetching } = useSelector((state: any) => state.user);

    ////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////
    const [passwordData, setPasswordData] = useState({ newPassword: "", oldPassword: "" });
    const [inputError, setInputError] = useState({ newPassword: "", oldPassword: "" });

    ////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { oldPassword, newPassword } = passwordData;

        // TODO: integrate react-hook-form  here

        if (!oldPassword)
            return setInputError((prev) => ({ ...prev, oldPassword: "Previous password is required" }));
        if (!newPassword)
            return setInputError((prev) => ({ ...prev, newPassword: "New password is required" }));
        if (newPassword.length < 6)
            return setInputError((prev) => ({ ...prev, newPassword: "New password length should contain at least 6 characters.", }));

        dispatch<any>(changePassword(passwordData))
            .then(() => {
                navigate("/");
            })
        setOpen(false);
    };



    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full ">

            <div className="text-center">
                <div className="flex justify-center">
                    <img className="h-32" src={logo} alt='Logo' />
                </div>
            </div>

            <div className="flex justify-center py-6 pl-0 ml-0 rounded-lg">
                <div className="w-96 h-auto shadow-xl rounded bg-white px-[2rem] py-[2rem] ">
                    <p className="text-xl text-slate-500 tracking-wide flex justify-center pt-2 ">
                        Change Password
                    </p>
                    <p className="flex justify-center text-center pt-2 font-Mulish text-slate-500 text-xs px-2">
                        Secure your account by updating your password. Enter your current and new password below to make the change                    </p>
                    <div className="flex flex-col gap-4 w-auto pt-4 ">
                        <div className="flex flex-col gap-8">
                            <Input
                                type="password"
                                name="oldPassword"
                                value={passwordData.oldPassword}
                                onChange={handleChange}
                                placeholder="Old Password"
                                className="w-[20rem] h-[40px] px-[8px] font-primary"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                            />
                            <Input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handleChange}
                                placeholder="New Password"
                                className="w-[20rem] h-[40px] px-[8px] font-primary"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                            />
                        </div>
                        <button onClick={handleSubmit} className={`w-[20rem] bg-dark-slate-blue hover:bg-dark-slate-blue-lighten p-2 rounded-lg transition-all text-white font-medium tracking-wider `}>
                            {isFetching ? 'Processing...' : 'Change Password'}
                        </button>
                        <div className="text-sm font-primary font-light text-slate-500 flex justify-center gap-2 p-2 pr-7">
                            Don't have account?
                            <Link to="/auth/register" className="text-sky-400 hover:text-sky-600">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ChangePassword;
