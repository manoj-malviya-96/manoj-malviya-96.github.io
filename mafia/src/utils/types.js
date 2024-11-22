export function rangesTo(range, toFunc){
    const result = [];
    for (let i = 0; i < range.length; i++) {
        result.push(toFunc(range[i]));
    }
    return result;
}


export class BentoBoxItem {
    constructor(title, description, date, tags, cover, size, onClickArg) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.tags = tags;
        this.cover = cover;
        this.size = size
        this.onClickArg = onClickArg
    }
}


