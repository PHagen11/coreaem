/* GET EACH CHAT BUTTON AND SAVE TO VARIABLE */
// const allChatButtons = document.querySelectorAll(".chat-button");
// let customerServiceBtn = document.querySelector(".cust-service-btn");
// let salesTeamBtn = document.querySelector(".sales-btn");
// let partsTeamBtn = document.querySelector(".parts-btn");

let callbackForm = document.getElementById("callback");

// for (let chatButton of allChatButtons) {
//     let value = chatButton.innerText;
//     console.log(value.search('SERVICE'))
//     if (value.search('CUSTOMER')) customerServiceBtn = chatButton
//     if (value.search('SALES')) salesTeamBtn = chatButton
//     if (value.search('PARTS')) partsTeamBtn = chatButton
// }

// console.log(customerServiceBtn);
// console.log(salesTeamBtn);
// console.log(partsTeamBtn);

/* GET MONTH AND DAY FOR VARIABLE HOLIDAYS */
const dateStringOptions = {
    day: 'numeric',
    month: 'numeric',
};
const getDate = (year, month, week, day) => {
    const firstDay = 1;
    if (week < 0) {
        month++;
    }
    // console.log((week * 7) + firstDay)
    const date = new Date(year, month, (week * 7) + firstDay);
    // console.log("getDay:" + date.getDay())
    if (day < date.getDay()) {
        day += 7;
    }
    // console.log("day:" + day)
    date.setDate(date.getDate() - date.getDay() + day);
    return date;
}
const getDateString = (year, month, week, day) => {
    const date = getDate(year, month, week, day);
    let localeDate = date.toLocaleDateString('en-US', dateStringOptions);
    localeDate = localeDate.split("/");
    const localeDateNum = localeDate.map(str => parseFloat(str));

    // const swapElement = (array, indexA, indexB) => {
    //     let tmp = array[indexA];
    //     array[indexA] = array[indexB];
    //     array[indexB] = tmp;
    // }
    // swapElement(localeDateNum, 0, 1);

    return localeDateNum;
}
const currentYear = new Date().getFullYear();
// console.log(getDateString(currentYear, 4, -1, 1));

/* END GET MONTH AND DAY FOR VARIABLE HOLIDAYS */

/* GET DAY AND HOUR. CHECK IF OPEN OR CLOSED BASED ON THAT */

const holidaysClosed = [
    [1, 1], // New Year's Day
    getDateString(currentYear, 4, -1, 3), // Memorial Day
    getDateString(currentYear, 8, 0, 1), // Labor Day
    getDateString(currentYear, 10, -1, 4), // Thanksgiving Day
    [12, 25], // Christmas Day
];

const dateTimeFormatOptions = {
    timeZone: 'US/Central',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    hour12: false,
    minute: 'numeric'
};

const startHour = 8, weekdayEndHour = [17, 30], saturdayEndHour = [16, 30], salesEndHour = 18;

const isInsideHours = (hour, minute) => { 
    return hour >= startHour && (hour < weekdayEndHour[0] || (hour === weekdayEndHour[0] && minute < weekdayEndHour[1]))
}
const isInsideSatHours = (hour, minute) => {
    return hour >= startHour && (hour < saturdayEndHour[0] || (hour === saturdayEndHour[0] && minute < saturdayEndHour[1]))
}
const isInsideSalesHours = (hour) => hour >= startHour && hour < salesEndHour;

// const isWeekday = (weekday) => weekday !== 'Sat' || 'Sun';
const isSaturday = (weekday) => weekday == 'Mon';
const isSunday = (weekday) => weekday == 'Sun';

const isHoliday = (month, day) =>
    holidaysClosed.some(([hMonth, hDay]) => hMonth === month && hDay === day);

const parseDateSegments = (date = new Date()) =>
    new Intl.DateTimeFormat('en-US', dateTimeFormatOptions)
        .formatToParts(date)
        .reduce((acc, part) => {
            const { type, value } = part;
            if (type === 'weekday') acc.weekday = value;
            else if (type !== 'literal') acc[type] = parseInt(value, 10);
            return acc;
        }, {});

const isInsideBusinessHours = (date = new Date()) => {
    const { weekday, day, month, hour, minute } = parseDateSegments(date);
    // console.log(`${weekday} ${day} ${month} ${hour} ${minute}`);
    // console.log(parseDateSegments())

    // console.log(!isHoliday(month, day))

    if (isInsideHours(hour, minute) && !isSaturday(weekday) && !isSunday(weekday) && !isHoliday(month, day)) {
        callbackForm.style.display = "block";
    } else if (isInsideSatHours(hour, minute) && isSaturday(weekday) && !isSunday(weekday) && !isHoliday(month, day)) {
        callbackForm.style.display = "block";
    } else {
        callbackForm.style.display = "none";
    }

    // if (isInsideHours(hour) && !isSaturday(weekday) && !isSunday(weekday) && !isHoliday(month, day)) {
    //     customerServiceBtn.style.display = "block";
    //     salesTeamBtn.style.display = "block";
    //     partsTeamBtn.style.display = "block";
    // } else if (isInsideSalesHours(hour) && !isSaturday(weekday) && !isSunday(weekday) && !isHoliday(month, day)) {
    //     customerServiceBtn.style.display = "none";
    //     salesTeamBtn.style.display = "block";
    //     partsTeamBtn.style.display = "none";
    // } else if (isInsideSalesHours(hour) && isSaturday(weekday) && !isSunday(weekday) && !isHoliday(month, day)) {
    //     customerServiceBtn.style.display = "none";
    //     salesTeamBtn.style.display = "block";
    //     partsTeamBtn.style.display = "none";
    // } else {
    //     customerServiceBtn.style.display = "none";
    //     salesTeamBtn.style.display = "none";
    //     partsTeamBtn.style.display = "none";
    // }
    // return isInsideHours(hour) && isWeekday(weekday) && !isHoliday(month, day);
};

isInsideBusinessHours();

// const isOpen = isInsideBusinessHours();

// if (isOpen) {
//     chatButton.style.display = "block";
// } else {
//     chatButton.style.display = "none";
// }

/* END GET DAY AND HOUR. CHECK IF OPEN OR CLOSED BASED ON THAT */