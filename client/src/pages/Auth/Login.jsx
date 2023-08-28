import { Person } from '@mui/icons-material'
import React, { useState } from 'react'
import { Input } from '../../components'
import { login } from '../../redux/actions/user'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

    //////////////////////////////////// STATES //////////////////////////////////////////
    const initialUserState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialUserState)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector(state => state.user)

    const handleLogin = () => {
        dispatch(login(userData, navigate))
    }

    return (
        <div style={{ minHeight: 'calc(100vh - 4rem)' }} className={`ha-auto flex justify-center items-center my-[2rem] overscroll-y-scroll bg-light-gray sticky top-[4rem] transition-all border-r-[2px] border-gray-100`}>
            <div className="w-fit shadow-box bg-gray-800 p-6 rounded-lg overflow-hidden flex flex-col justify-between items-center gap-4 ">
                <div className="flex justify-center items-center w-20 h-20 rounded-full bg-teal-500">
                    <Person style={{ fontSize: '4rem' }} className="text-white" />
                </div>
                <div className="flex flex-col gap-6 w-full">
                    <Input
                        attribute="email"
                        type="email"
                        placeholder="Email..."
                        formData={userData}
                        setFormData={setUserData}
                    />
                    <Input
                        attribute="password"
                        type='password'
                        placeholder="Password..."
                        formData={userData}
                        setFormData={setUserData}
                        showEyeIcon
                    />
                </div>
                <div className="flex flex-col items-center gap-6 w-full">
                    <div className="flex flex-col items-center gap-2 w-full">
                        <button onClick={handleLogin} className="w-full bg-green-500 p-2 rounded-md min-h-[40px] text-white font-semibold">
                            {isFetching ? 'Submitting...' : 'Login'}
                        </button>
                        <p className="text-gray-400 text-[14px] mt-[12px] flex justify-center items-center gap-2">
                            Don't have an account?
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

export default Login
