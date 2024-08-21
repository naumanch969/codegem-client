
import React, { useState } from 'react'
import { Plan, User } from '@/interfaces'
import { CheckCircle, Person, WorkspacePremium } from '@mui/icons-material'
import { useEffect } from 'react'
import { FaCrown } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import getStripe from '@/stripe/index'
import { Stripe } from '@stripe/stripe-js';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Loader } from '@/utils/Components'
import { baseURL } from '@/constant'
import { RootState } from '@/redux/store'

const page = () => {

    //////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loggedUser: user } = useSelector((state: RootState) => state.user)
    const [loggedUser, setLoggedUser] = useState<User>(user!)
    const currentPlan = loggedUser?.subscription?.plan

    //////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
    const [planType, setPlanType] = useState<string>("monthly")
    const [loading, setLoading] = useState<boolean>(false)
    const [plans, setPlans] = useState<Plan[]>([])

    const filteredPlans = plans.filter((plan: Plan) => plan.billing.toLowerCase() == planType)
    //////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////
    useEffect(() => {
        if (user)
            setLoggedUser(user!)
    }, [user])

    //////////////////////////////////////////////// FUNCTION ////////////////////////////////////////////////////
    const handleClick = (plan: Plan) => {
        currentPlan?.name?.toLowerCase() == 'free'
            ?
            handleCheckout(plan)
            :
            handleAccessPortal()
    }
    const handleCheckout = async (plan: Plan) => {
        try {
            setLoading(true)
            const { data } = await axios.post(`${baseURL}/subscription/checkout`, { planName: plan.name, billing: plan.billing }, { withCredentials: true })
            navigate(data.url, { replace: true });
            return getStripe()
                .then((stripe: Stripe | null) => {
                    if (stripe) {
                        return stripe.redirectToCheckout({ sessionId: data.sessionId });
                    }
                    setLoading(false)
                });
        }
        catch (err) {
            setLoading(false)
            console.error('stripe error', err)
        }
    }

    const handleAccessPortal = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${baseURL}/subscription/portal`, { withCredentials: true })
            window.location.href = data.url;
            setLoading(false)
        }
        catch (err) {
            setLoading(false)
            console.error('stripe error', err)
        }
    }
    const handleToggle = () => {
        setPlanType(planType === 'monthly' ? 'yearly' : 'monthly');
    };


    //////////////////////////////////////////////// COMPONENTS ////////////////////////////////////////////////////
    const Board = ({ plan }: { plan: Plan }) => {

        const isBasic = plan.name == 'BASIC'
        const isPro = plan.name == 'PRO'

        return (
            <div className={`
            col-span-1 w-full flex flex-col gap-2 p-8 border-[1px] border-light-gray rounded-md relative
            ${isBasic ? 'bg-main-blue text-white ' : isPro ? 'bg-white border-orange text-main-blue ' : 'bg-lighter-gray text-main-blue '}
        `}>

                {
                    isPro && <FaCrown style={{ fontSize: '64px' }} className='text-orange rotate-[45deg] absolute top-[-2rem] right-[-2rem] ' />
                }
                <div className="flex justify-between items-center">
                    <h3 className='text-text-gray text-[24px] font-medium  ' >{plan.name}</h3>
                </div>
                <div className={`
                text-4xl font-medium 
                ${isBasic ? 'text-white ' : isPro ? 'text-main-blue ' : 'text-main-blue '}
            `} >
                    <span  >${plan.price}</span>
                    <span className={`
                    text-[1rem] font-medium ml-2 capitalize
                    ${isBasic ? 'text-white ' : isPro ? 'text-main-blue ' : 'text-light-gray '}
                `} >/{plan.billing}</span>
                </div>
                <div className="flex flex-col gap-4 ">
                    {
                        plan.features.map((feature: any, index: number) => (
                            <div className="flex justify-start gap-4 " key={index} >
                                <CheckCircle
                                    style={{ fontSize: '20px' }}
                                    className={`
                                    ${isBasic ? 'text-white ' : isPro ? 'text-orange ' : 'text-main-blue '}
                                `} />
                                <span
                                    className={`
                                    text-[16px] font-light 
                                    ${isBasic ? 'text-white ' : isPro ? 'text-main-blue ' : 'text-main-blue '}
                            `} >
                                    {feature}
                                </span>
                            </div>
                        ))
                    }
                </div>

                <button
                    disabled={currentPlan?.name == plan.name && currentPlan?.billing == plan.billing}
                    onClick={() => handleClick(plan)}
                    className={`
                        disabled:cursor-not-allowed border-[2px] w-full h-[50px] rounded-sm mt-[12px] font-bold flex justify-center items-center
                        ${isBasic ? 'bg-white text-main-blue border-white' : isPro ? 'bg-orange text-main-blue border-orange' : 'bg-white text-main-blue border-main-blue '}
                    `}
                >
                    {
                        loading
                            ?
                            <Loader />
                            :
                            <>
                                {(currentPlan?.name == plan.name && currentPlan?.billing == plan.billing) ? 'Current Plan' : 'Choose Plan'}
                            </>
                    }
                </button>

            </div >
        )
    }

    return (
        <>

            <div className="flex flex-col gap-8 md:px-[2.5rem] md:pt-[3rem] md:pb-8 sm:p-6 p-4 bg-white ">

                <h2 className='flex items-center gap-2 font-bold text-3xl ' >
                    <Person style={{ fontSize: '3rem' }} />
                    <span>Plans</span>
                </h2>

                <div className="flex lg:flex-row flex-col justify-between lg:items-center items-start gap-3 lg:gap-4 border-[2px] border-light-gray rounded-md lg:px-[3rem] lg:py-8 sm:p-4 p-3 relative ">
                    <div className="flex flex-col justify-start md:gap-4 ">
                        <div className="flex justify-start items-center gap-2 ">
                            <span className='flex justify-center items-center bg-main-blue rounded-full w-[4rem] h-[4rem] ' >
                                <WorkspacePremium style={{ fontSize: '40px' }} className='text-white' />
                            </span>
                            <div className="flex sm:flex-row flex-col md:justify-center justify-start items-center h-full lg:gap-12 md:gap-8 sm:gap-6 gap-4 ">
                                <h4 className='text-main-blue lg:text-[24px] md:text-[20px] text-[16px] font-bold capitalize' >
                                    {loggedUser?.subscription?.plan?.name} Plan <span className='font-light ' >({loggedUser?.subscription?.plan?.billing})</span>
                                </h4>
                                <span className='capitalize bg-green-300 border-[2px] border-green-700 text-green-700 h-fit w-fit rounded-full px-[10px] py-[2px] ' >Active</span>
                            </div>
                        </div>
                    </div>
                    {
                        loggedUser?.subscription?.plan?.name?.toLowerCase() != 'free'
                        &&
                        <div className="flex lg:w-fit w-full ">
                            <button
                                onClick={handleAccessPortal}
                                className='bg-black text-white px-8 py-[12px] rounded-full shadow-lg '
                            >Manage Plan</button>
                        </div>
                    }
                </div>

                <div className="flex justify-start flex-wrap gap-4 w-full ">
                    <div className="w-full flex justify-center items-center">
                        <div className="md:w-48 w-44 md:h-[4rem] h-[52px] flex items-center gap-2 bg-lighter-blue rounded-full p-[1.5px]">
                            <button
                                onClick={() => handleToggle()}
                                className={`w-1/2 h-full rounded-full font-medium ${planType === 'monthly' ? 'bg-main-blue text-white' : 'bg-lighter-blue text-main-blue'
                                    } transition-all duration-300 ease-in-out `}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => handleToggle()}
                                className={`w-1/2 h-full rounded-full font-medium ${planType === 'yearly' ? 'bg-main-blue text-white' : 'bg-lighter-blue text-main-blue'
                                    } transition-all duration-300 ease-in-out `}
                            >
                                Yearly
                            </button>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            filteredPlans.map((plan, index) => (
                                <Board plan={plan} key={index} />
                            ))
                        }
                    </div>
                </div>


            </div>

        </>
    )
}

export default page