import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import moment from 'moment-timezone';
import { Message } from '@/interfaces';

interface StateContextProps {
    Months: string[];
    Days: string[];
    currentDate: number;
    currentMonth: number;
    currentDay: number;
    currentYear: number;
    currentHour: number;
    currentMinute: number;
    currentSecond: number;
    resetedDate: {
        day: number;
        date: number;
        month: number;
        year: number;
        hour: number;
        minute: number;
        second: number;
    };
    showSnackbar: boolean;
    setShowSnackbar: Dispatch<SetStateAction<boolean>>;
    urlPath: string[];
    setUrlPath: Dispatch<SetStateAction<string[]>>;
    rightbar: boolean;
    setRightbar: Dispatch<SetStateAction<boolean>>;
    showSidebar: boolean;
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
    showFriendSidebar: boolean;
    setShowFriendSidebar: Dispatch<SetStateAction<boolean>>;

    isConnectedToSocket: boolean, setIsConnectedToSocket: Dispatch<SetStateAction<boolean>>;
    arrivalMessage: Message | null, setArrivalMessage: Dispatch<SetStateAction<Message | null>>
    liveUsers: { userId: string, socketId: string, email: string }[], setLiveUsers: Dispatch<SetStateAction<{ userId: string, socketId: string, email: string }[]>>
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // all days months years etc.
    const Months = ['January', 'February', 'Matrch', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let timeZone = moment.tz.guess();
    let currentTime = moment.tz(timeZone);
    const currentDate = currentTime.date();
    const currentMonth = currentTime.month();
    const currentDay = currentTime.day();
    const currentYear = currentTime.year();
    const currentHour = currentTime.hour();
    const currentMinute = currentTime.minute();
    const currentSecond = currentTime.second();
    const resetedDate = { day: currentDay, date: currentDate, month: currentMonth, year: currentYear, hour: currentHour, minute: currentMinute, second: currentSecond };

    // all - general
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [urlPath, setUrlPath] = useState(window.location.pathname.split('/').slice(1));
    const [rightbar, setRightbar] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [showFriendSidebar, setShowFriendSidebar] = useState(true);

    // chat
    const [isConnectedToSocket, setIsConnectedToSocket] = useState(false);
    const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);
    const [liveUsers, setLiveUsers] = useState<{ userId: string, socketId: string, email: string }[]>([]);


    const contextValues: StateContextProps = {
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
        showSnackbar, setShowSnackbar,
        urlPath, setUrlPath,
        rightbar, setRightbar,
        showSidebar, setShowSidebar,
        showFriendSidebar, setShowFriendSidebar,

        isConnectedToSocket, setIsConnectedToSocket,
        arrivalMessage, setArrivalMessage,
        liveUsers, setLiveUsers,
    };

    return <StateContext.Provider value={contextValues}>{children}</StateContext.Provider>;
};

export const useStateContext = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useStateContext must be used within a StateContextProvider');
    }
    return context;
};
