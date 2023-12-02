import { Person } from '@mui/icons-material'
import React, { useState } from 'react'
import { Input } from '../../components'
import { login } from '../../redux/actions/user'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
    //////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const initialUserState = { email: '', password: '' }
    const { isFetching, error } = useSelector(state => state.user)

    //////////////////////////////////////////////// STATES ////////////////////////////////////////////
    const [userData, setUserData] = useState(initialUserState)

    //////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////

    //////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////
    const handleLogin = () => {
        const { email, password } = userData
        if (!email || !password) return alert('Make sure to provide all the fields')
        dispatch(login(userData, navigate))
    }

    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full p-[3rem]">

            <div className=" " >
                <h2 style={{ fontFamily: 'cursive' }} className="font-bolder text-4xl font-bold " >CodeGem</h2>
            </div>

            <div className="shadow-box w-fit bg-gray-800 p-6 rounded-lg overflow-hidden flex flex-col justify-between items-center gap-[1rem] ">
                <h2 className='text-white text-2xl font-medium ' >Login</h2>
                <div className="flex flex-col gap-[12px] w-full">
                    <div className="flex flex-col gap-[4px] ">
                        <label className="text-gray-300">Email</label>
                        <Input
                            attribute="email"
                            type="email"
                            placeholder="Email"
                            formData={userData}
                            setFormData={setUserData}
                        />
                    </div>
                    <div className="flex flex-col gap-[4px] ">
                        <label className="text-gray-300">Password</label>
                        <Input
                            attribute="password"
                            type='password'
                            placeholder="Password"
                            formData={userData}
                            setFormData={setUserData}
                            showEyeIcon
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center w-full gap-6">
                    <div className="flex flex-col items-center gap-2 w-full">
                        <button onClick={handleLogin} className="w-full bg-green-500 p-2 rounded-md min-h-[40px] text-white font-semibold">
                            {isFetching ? 'Submitting...' : 'Login'}
                        </button>
                        <p className="text-gray-400 flex justify-center items-center gap-2">
                            Don't have account?
                            <Link to='/auth/register' className="underline cursor-pointer text-blue-500">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    )
}

export default Login;
