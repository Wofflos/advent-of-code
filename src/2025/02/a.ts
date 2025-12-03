import { readLines } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const ranges = readLines(import.meta.filename, isTest).flatMap((line) =>
        line.trim().split(",")
    );

    let nums = [];
    for (const range of ranges) {
        let [start, end] = range.split("-").map(toNumber);

        for (; start <= end; start++) {
            let num = start.toString(10);
            if (num.length % 2 != 0) continue;

            let a = num.slice(0, num.length / 2);
            let b = num.slice(num.length / 2);

            if (a === b) {
                nums.push(start);
            }
        }
    }

    return nums.reduce((a, b) => a + b, 0);
}
