import { readLines } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    const banks = [];
    for (const line of lines) {
        banks.push(getBankJoltage(line.split("").map(toNumber)));
    }

    return banks.reduce((a, b) => a + b, 0);
}

function getBankJoltage(nums: number[]): number {
    let num = "";
    for (let i = 11; i >= 0; i--) {
        let n = nums.slice(0, !i ? undefined : -i).toSorted().pop() as number;
        nums = nums.slice(nums.indexOf(n) + 1);
        num += n;
    }
    return toNumber(num);
}
