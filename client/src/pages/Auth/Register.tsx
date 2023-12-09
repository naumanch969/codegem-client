import React, { FC, useEffect, useState } from 'react';
import { Input } from "@mui/material";
import { Person } from '@mui/icons-material';
import { register } from '../../redux/actions/user';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../interfaces';
import { logo } from '../../assets';

interface UserState {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

const Register = ({ snackbarText, setSnackbarText }: { snackbarText: string, setSnackbarText: any }) => {

    ///////////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialUserState: UserState = { firstName: '', lastName: '', username: '', email: '', password: '' };

    ///////////////////////////////////////////////////////// STATES /////////////////////////////////////////////////////
    const { isFetching, error } = useSelector((state: any) => state.user);
    const [userData, setUserData] = useState<User>(initialUserState);
    // const [snackbarText, setSnackbarText] = useState<string>('');

    ///////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////
    const handleSubmit = () => {
        const { firstName, lastName, username, email, password } = userData;
        if (!firstName || !lastName || !username || !email || !password) return alert('Make sure to provide all the fields');
        dispatch<any>(register(userData, navigate, setSnackbarText));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    }

    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full p-[3rem]">


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
                        Register
                    </p>
                    <p className="flex justify-center text-center pt-2 font-Mulish text-slate-500 text-xs px-10">
                        Sign up by entering your details below. It's quick, easy, and secure.
                    </p>
                    <div className="flex flex-col gap-[10px] w-auto pt-4 ">
                        <div className="flex flex-col gap-8">
                            <Input
                                type="string"
                                name="firstName"
                                value={userData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="w-[20rem] h-[40px] px-[8px] font-primary"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                            />
                            <Input
                                type="string"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-[20rem] h-[40px] px-[8px] font-primary"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                            />
                            <Input
                                type="string"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className="w-[20rem] h-[40px] px-[8px] font-primary"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                            />
                            <Input
                                type="string"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-[20rem] h-[40px] px-[8px] font-primary"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                            />
                            <Input
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-[20rem] h-[40px] px-[8px] font-primary"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                            />
                        </div>
                        <br />
                        <button onClick={handleSubmit} className={`w-[20rem] bg-dark-slate-blue hover:bg-dark-slate-blue-lighten p-2 rounded-lg transition-all text-white font-medium tracking-wider `}>
                            {isFetching ? 'Registering...' : 'Register'}
                        </button>
                        <div className="text-sm font-primary font-light text-slate-500 flex justify-center gap-2 p-2 pr-7">
                            Don't have account?
                            <Link to="/auth/login" className="text-sky-400 hover:text-sky-600">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Register;
