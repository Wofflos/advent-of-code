import { readLines } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest).map((line) => line.trim().split(/\s+/));
    const grid: string[][] = [];
    for (let x = 0; x < lines[0].length; x++) {
        let ar: string[] = [];
        for (let y = 0; y < lines.length; y++) {
            ar.push(lines[y][x]);
        }
        grid.push(ar);
    }

    const totals = [];

    for (const nums of grid) {
        let op = nums.pop();

        const result = nums.map(toNumber).reduce((acc, curr) => {
            if (op === "+") {
                acc += curr;
            } else if (op === "*") {
                acc *= curr;
            }
            return acc;
        }, op === "+" ? 0 : 1);
        totals.push(result);
    }

    return totals.reduce((acc, curr) => acc + curr, 0);
}
