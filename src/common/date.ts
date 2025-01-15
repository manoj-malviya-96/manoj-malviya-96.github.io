export const monthsToNumberMap: Record<string, number> = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
};


export function fromTxtMonth(month: string): number {
    return monthsToNumberMap[month] || 0;
}

export function toTxtMonth(month: number) {
    for (const [key, value] of Object.entries(monthsToNumberMap)) {
        if (value === month) {
            return key;
        }
    }
    return "";
}

export function parseDate(dateString: string) {
    const [month, day, year] = dateString.split(" ");
    return (
        Number(year) * 10000 + fromTxtMonth(month) * 100 + parseInt(day.replace(",", ""))
    );
}

export function isLeapYear(year: number) {
    return (
               year % 4 === 0 && year % 100 !== 0
           ) || year % 400 === 0;
}

export function calDaysInMonth(year: number) {
    let result = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (isLeapYear(year)) {
        result[1] = 29;
    } // Adjust for leap years
    return result;
}

export function formatTime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const minutes = Math.floor((
                                   seconds % 3600
                               ) / 60);
    const secs = Math.floor(seconds % 60);
    
    const paddedSecs = secs.toString().padStart(2, "0");
    const paddedMins = minutes.toString().padStart(2, "0");
    return hrs > 0 ? `${hrs}:${paddedMins}:${paddedSecs}` : `${minutes}:${paddedSecs}`;
};




const hoursInDay = 24;
const minutesInHour = 60;
const secondsInMinute = 60;
const millisecondsInSecond = 1000;


export function DayToMs(days: number) {
    return days * hoursInDay * minutesInHour * secondsInMinute * millisecondsInSecond;
}


