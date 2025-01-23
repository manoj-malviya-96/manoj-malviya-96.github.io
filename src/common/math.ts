export function rangesTo<T1, T2>(
  range: Array<T1>,
  toFunc: (item: T1) => T2,
): Array<T2> {
  const result: T2[] = [];
  for (let i = 0; i < range.length; i++) {
    result.push(toFunc(range[i]));
  }
  return result;
}

export const sumRange = (range: NdArray): number =>
  (Array.isArray(range) ? range : Array.from(range)).reduce(
    (acc: number, val: number) => acc + val,
    0,
  );

export function arrayNonZeroCount(arr: NdArray) {
  let result = 0;
  arr.forEach((a) => {
    if (a > 0) {
      result += 1;
    }
  });
  return result;
}

export const meanRange = (range: NdArray) => sumRange(range) / range.length;

export function meanRangeWithNonZero(range: NdArray) {
  return sumRange(range) / arrayNonZeroCount(range);
}

export const roundTo = (num: number, places: number) => {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
};

export function aRange(
  min: number,
  length: number,
  step: number,
): Array<number> {
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(min + i * step);
  }
  return result;
}

export function longestNonZeroSubset(arr: number[]) {
  let maxLength = 0;
  let currentLength = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      currentLength++;
      if (currentLength > maxLength) {
        maxLength = currentLength;
      }
    } else {
      currentLength = 0;
    }
  }
  return maxLength;
}
