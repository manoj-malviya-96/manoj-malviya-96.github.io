export function rangesTo(range: Array<any>, toFunc: (item: any) => any): Array<any> {
    const result = [];
    for (let i = 0; i < range.length; i++) {
        result.push(toFunc(range[i]));
    }
    return result;
}