import { SOCKET_URL } from "@/constant";
import { User } from "@/interfaces";
import { setLoggedUserSlice, setLoggedUserTokenSlice } from "@/redux/reducers/userSlice";
import { io } from "socket.io-client";
import { formatDistanceToNow } from 'date-fns';
import { Timestamp } from "firebase/firestore";

// 1)
export const limitText = (str: string | undefined, limit: number): string | undefined => {
    if (str) {
        if (str.split("").length > limit) {
            const strArr = str.slice(0, limit).trim().split(" ");
            const string = strArr.slice(0, strArr.length).join(" ");
            return string.concat(`...`);
        } else {
            return str;
        }
    }
};

// 2)
export const capitalize = (str: string | undefined): string | undefined => {
    return str && str.charAt(0).toUpperCase() + str.slice(1);
};

// 3)
export const lowercase = (str: string | undefined): string | undefined => {
    return str && str.toLowerCase();
};

// 4)
export const dateObj = (dateInput: string): { hour: number, minute: number, second: number, year: number, month: number, date: number, day: number } => {
    const newDate = new Date(dateInput);
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();
    const second = newDate.getSeconds();
    const year = newDate.getFullYear();
    const date = newDate.getDate();
    return { hour, minute, second, year, month, date, day };
};

// 5)
export const lightenDarkenColor = (col: string, amt: number): string => {
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00FF) + amt;
    var g = (num & 0x0000FF) + amt;
    var newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
};

// 6)
export const generateRandom = (from: number, to: number): number => {
    let random = Math.floor(Math.random() * to) + from;
    return random;
};

// 7)
export const connectToSocketIO = (setIsConnectedToSocket: any, loggedUser: User, setLiveUsers: any, setArrivalMessage: any) => {
    const serverURL = SOCKET_URL;
    const socket = io(serverURL);
    socket.on("connect", () => {
        setIsConnectedToSocket(true);
        socket.emit('addUser', { userId: loggedUser?._id, socketId: socket.id, email: loggedUser?.email });
        socket.on('getUsers', (lUsers: any) => { setLiveUsers(lUsers) })
        socket.on('getMessage', (message: any) => { setArrivalMessage(message) })
    })
    socket.on("disconnect", () => {
        setIsConnectedToSocket(false);
    })
};

// 8)
export const disconnectToSocketIO = (setIsConnectedToSocket: any) => {
    const serverURL = SOCKET_URL;
    const socket = io(serverURL);
    setIsConnectedToSocket(false);
    socket.disconnect();
};

// 9)
export const getRelativeTime = (date: Date) => {
    if (!date) return ''
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};


// 10)
export const getOtherUserDetail = (chatParticipantIds: string[], users: User[], currentUserId: string) => {

    if (!currentUserId) return

    const otherUserId = chatParticipantIds?.find((pId) => pId != currentUserId); // user to chat with
    const otherUser = users?.find((user) => user?._id === otherUserId); // Finding userToChatWith details

    return otherUser;
};

// 11)
export const removeUndefinedFields = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(item => removeUndefinedFields(item));
    } else if (obj !== null && typeof obj === 'object') {
        // Handle Date objects
        if (obj instanceof Date) {
            return obj;
        }

        const newObj: any = {};

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] === undefined) {
                    newObj[key] = '';
                } else if (Array.isArray(obj[key])) {
                    newObj[key] = obj[key].map((item: any) => removeUndefinedFields(item));
                } else if (obj[key] !== null && typeof obj[key] === 'object') {
                    newObj[key] = removeUndefinedFields(obj[key]);
                } else {
                    newObj[key] = obj[key];
                }
            }
        }

        return newObj;
    }

    return obj;
};


// 12)
export const formatChatTimestamp = (timestamp: any) => {
    let dateObject;
    if (timestamp?.seconds)
        dateObject = timestamp.toDate(); // if firebase timestamp is provided
    else dateObject = new Date(timestamp); // if js Date object is  provided

    const now: any = new Date();
    const diffInDays = Math.floor((now - dateObject) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        // If the timestamp is from today, format time with AM/PM
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        const amOrPm = hours < 12 ? 'AM' : 'PM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
    } else {
        // If the timestamp is from a previous date, format date along with time in AM/PM
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return dateObject.toLocaleDateString(undefined, options);
    }
};

// 13)
export const formatChatMessageTimestamp = (date: any): string => {

    if (!date) return ''

    const now = new Date();
    const thisDate = date?.seconds ? date?.toDate() : new Date(date as Date)

    const isToday = thisDate?.toDateString() === now?.toDateString();

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    };

    const timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions);
    const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);

    const timeString = timeFormatter?.format(thisDate);

    if (isToday) {
        return timeString;
    } else {
        const dateString = dateFormatter?.format(thisDate);
        return `${dateString}, ${timeString}`;
    }
};
