import { readLines } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    const map: number[][] = lines.map((l) => l.split(" ").map((d) => toNumber(d)));

    let safe = 0;

    for (const report of map) {
        if (isSafe(report)) {
            safe++;
        } else {
            for (let i = 0; i < report.length; i++) {
                const dampened = [...report];
                dampened.splice(i, 1);
                if (isSafe(dampened)) {
                    safe++;
                    break;
                }
            }
        }
    }

    return safe;
}

function isSafe(report: number[]): boolean {
    let lastDiff = null;
    for (let index = 1; index < report.length; index++) {
        let diff = report[index - 1] - report[index];
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }

        if (lastDiff && !((diff > 0 && lastDiff > 0) || (diff < 0 && lastDiff < 0))) {
            return false;
        }
        lastDiff = diff;
    }

    return true;
}
