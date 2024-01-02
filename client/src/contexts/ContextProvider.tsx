import React, { createContext, useContext, useState, ReactNode } from 'react';
import moment from 'moment-timezone';

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
    setShowSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
    urlPath: string[];
    setUrlPath: React.Dispatch<React.SetStateAction<string[]>>;
    rightbar: boolean;
    setRightbar: React.Dispatch<React.SetStateAction<boolean>>;
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    showFriendSidebar: boolean;
    setShowFriendSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    showCodeCreateModal: boolean;
    setShowCodeCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
    showStreakCreateModal: boolean;
    setShowStreakCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
    showChallengeCreateModal: boolean;
    setShowChallengeCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
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
    const [showCodeCreateModal, setShowCodeCreateModal] = useState(false);
    const [showStreakCreateModal, setShowStreakCreateModal] = useState(false);
    const [showChallengeCreateModal, setShowChallengeCreateModal] = useState(false);

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
        setShowCodeCreateModal,
        showStreakCreateModal, setShowStreakCreateModal,
        showChallengeCreateModal, setShowChallengeCreateModal
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
