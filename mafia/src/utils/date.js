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