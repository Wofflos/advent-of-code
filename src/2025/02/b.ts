import { readLines } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const ranges = readLines(import.meta.filename, isTest).flatMap((line) =>
        line.trim().split(",")
    );

    let nums = [];
    for (const range of ranges) {
        let [start, end] = range.split("-").map(toNumber);

        do {
            let num = start.toString(10).split("");
            let part = "";
            do {
                part += num.shift();
                let n = num.join("");
                if (n.includes(part) && n.split(part).length == n.length / part.length + 1) {
                    nums.push(start);
                    break;
                }
            } while (part.length < num.length);

            start++;
        } while (start <= end);
    }

    console.log(nums);
    return nums.reduce((a, b) => a + b, 0);
}
