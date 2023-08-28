import { createContext, useContext, useState, useRef } from "react"
import { limitText } from '../utils/functions/function'
import moment from 'moment-timezone'
import Cookie from 'js-cookie'
import { image1, image2, image3, image4, image5, image6 } from '../assets'

const StateContext = createContext();



export const ContextProvider = ({ children }) => {

    // all days months years etc.
    const Months = ['January', 'February', 'Matrch', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    let timeZone = moment.tz.guess()
    let currentTime = moment.tz(timeZone)
    const currentDate = currentTime.date()
    const currentMonth = currentTime.month()
    const currentDay = currentTime.day()
    const currentYear = currentTime.year()
    const currentHour = currentTime.hour()
    const currentMinute = currentTime.minute()
    const currentSecond = currentTime.second()
    const resetedDate = { day: currentDay, date: currentDate, month: currentMonth, year: currentYear, hour: currentHour, minute: currentMinute, second: currentSecond }




    // all - general
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [urlPath, setUrlPath] = useState(window.location.pathname.split('/').slice(1,))
    const [rightbar, setRightbar] = useState(false)
    const [showSidebar, setShowSidebar] = useState(true)
    const [showFriendSidebar, setShowFriendSidebar] = useState(true)
    const [showCodeCreateModal, setShowCodeCreateModal] = useState(false)


    return (
        <StateContext.Provider
            value={{
                Months,
                Days,
                currentDate,
                currentMonth,
                currentDay,
                currentYear,
                currentHour,
                currentMinute,
                currentSecond,
                resetedDate,
                showSnackbar,
                setShowSnackbar,
                urlPath,
                setUrlPath,
                rightbar,
                setRightbar,
                showSidebar,
                setShowSidebar,
                showFriendSidebar,
                setShowFriendSidebar,
                showCodeCreateModal,
                setShowCodeCreateModal
            }}
        >
            {children}
        </StateContext.Provider>
    )
}



export const useStateContext = () => useContext(StateContext)