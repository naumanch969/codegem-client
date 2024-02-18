import React, { FC, useState } from 'react';
import { Person, VisibilityOff } from '@mui/icons-material';
import { Input } from "@mui/material";
import { login } from '../../redux/actions/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InputAdornment } from '@mui/material';
import { logo } from '../../assets';

interface UserState {
    username: string;
    password: string;
}

const Login = ({ snackbarText, setSnackbarText }: { snackbarText?: string, setSnackbarText?: any }) => {

    ////////////////////////////////////////////////////// VARIABLS //////////////////////////////////////////////////////
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialUserState: UserState = { username: '', password: '' };
    const { isFetching, error } = useSelector((state: any) => state.user);

    ////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////
    const [userData, setUserData] = useState<UserState>(initialUserState);

    ////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////
    const handleSubmit = () => {
        const { username, password } = userData;
        if (!username || !password) return alert('Make sure to provide all the fields');
        dispatch<any>(login(userData, navigate, setSnackbarText));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    }



    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full ">

            <div className="text-center">
                <div className="flex justify-center">
                    <img className="h-32" src={logo} />
                </div>
            </div>

            <div className="flex justify-center py-6 pl-0 ml-0 rounded-lg">
                <div className="w-96 h-auto shadow-xl rounded bg-white px-[2rem] py-[2rem] ">
                    <div className="w-full flex justify-center items-center ">
                        <div className="flex justify-center items-center w-20 h-20 rounded-full bg-dark-slate-blue">
                            <Person style={{ fontSize: '4rem' }} className="text-white" />
                        </div>
                    </div>
                    <p className="text-xl text-slate-500 tracking-wide flex justify-center pt-2 ">
                        Login
                    </p>
                    <p className="flex justify-center text-center pt-2 font-Mulish text-slate-500 text-xs px-10">
                        Please enter your username address to log in and access your account.
                    </p>
                    <div className="flex flex-col gap-4 w-auto pt-4 ">
                        <div className="flex flex-col gap-8">
                            <Input
                                type="string"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                placeholder="Username or Email"
                                className="w-[20rem] h-[40px] px-[8px] font-primary"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                            />
                            <div className="flex flex-col gap-4 ">
                                <Input
                                    type="password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-[20rem] h-[40px] px-[8px] font-primary"
                                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                                />
                                <div className="text-sm font-primary font-light text-slate-500 flex justify-end ">
                                    <Link to="/auth/verify_email" className="text-sky-400 hover:text-sky-600">
                                        Forget Password?
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleSubmit} className={`w-[20rem] bg-dark-slate-blue hover:bg-dark-slate-blue-lighten p-2 rounded-lg transition-all text-white font-medium tracking-wider `}>
                            {isFetching ? 'Loging In...' : 'Login'}
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
    )
}

export default Login;
