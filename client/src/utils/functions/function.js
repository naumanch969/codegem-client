
// 1)
export const limitText = (str, limit) => {
    if (str) {
        if (str.split("").length > limit) {
            const strArr = str.slice(0, limit).trim().split(" ")
            const string = strArr.slice(0, strArr.length).join(" ") // strArr.length - 1
            return string.concat(`...`)
        }
        else {
            return str
        }
    }
}


// 2)
export const Capitalize = (str) => {
    return str && str.charAt(0).toUpperCase() + str.slice(1);
}

// 2)
export const lowercase = (str) => {
    return str && str.toLowerCase()
}

// 2)
export const dateObj = (dateInput) => {
    const newDate = new Date(dateInput)
    const month = newDate.getMonth() + 1
    const day = newDate.getMonth() + 1
    const hour = newDate.getHours()
    const minute = newDate.getMinutes()
    const second = newDate.getSeconds()
    const year = newDate.getFullYear()
    const date = newDate.getDate()
    return { hour, minute, second, year, month, date, day }
}


// 3)
export const LightenDarkenColor = (col, amt) => {
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00FF) + amt;
    var g = (num & 0x0000FF) + amt;
    var newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
}

// 4)
export const generateRandom = (from, to) => {
    let random = Math.floor(Math.random() * to) + from    // random from 1 to 10
    return random
}