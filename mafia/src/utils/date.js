/* ------------ Date Parsing ------------ */
export const months = {
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

export function fromTxtMonth(month) {
    return months[month] || 0;
}

export function toTxtMonth(month) {
    for (const [key, value] of Object.entries(months)) {
        if (value === month) {
            return key;
        }
    }
    return "";
}

export function parseDate(dateString) {
    const [month, day, year] = dateString.split(" ");
    return (
        year * 10000 + fromTxtMonth(month) * 100 + parseInt(day.replace(",", ""))
    );
}

export function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function calDaysInMonth(year){
    let result = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (isLeapYear(year)) result[1] = 29; // Adjust for leap years
    return result;
}
