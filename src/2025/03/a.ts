import { readLines } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    const banks = [];
    for (const line of lines) {
        let nums = line.split("").map(toNumber);
        let first = nums.slice(0, -1).toSorted().reverse()[0];
        let second = nums.slice(nums.indexOf(first) + 1).toSorted().reverse()[0];
        banks.push(toNumber(`${first}${second}`));
    }

    return banks.reduce((a, b) => a + b, 0);
}
