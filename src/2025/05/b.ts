import { readFile } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const [rangesStr, _] = readFile(import.meta.filename, isTest).split("\n\n");

    let ranges = rangesStr.split("\n").map((line) => {
        const [min, max] = line.split("-").map(toNumber);
        return { min, max };
    });

    ranges.sort((a, b) => a.min - b.min);
    const merged = [];
    let current = ranges[0];

    for (let i = 1; i < ranges.length; i++) {
        const next = ranges[i];

        if (next.min <= current.max + 1) {
            current.max = Math.max(current.max, next.max);
        } else {
            merged.push(current);
            current = next;
        }
    }
    merged.push(current);

    return merged.reduce((acc, range) => {
        return acc + (range.max - range.min + 1);
    }, 0);
}
