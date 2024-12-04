import { readLines } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    let multi = 0;
    for (const line of lines) {
        const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
        const matches = [...line.matchAll(regex)];

        matches.forEach((m) => {
            multi += toNumber(m[1]) * toNumber(m[2]);
        });
    }

    return multi;
}
