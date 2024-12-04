import { readLines } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const line = readLines(import.meta.filename, isTest).join("");

    const inst: boolean[] = [];

    let multi = 0;

    [...line.matchAll(/(do\(\))/g)].forEach((d) => {
        inst[d.index] = true;
    });

    [...line.matchAll(/(don't\(\))/g)].forEach((d) => {
        inst[d.index] = false;
    });

    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const matches = [...line.matchAll(regex)];

    let enabled = true;
    let lastIndex = 0;
    for (const m of matches) {
        for (let index = m.index; index > lastIndex; index--) {
            const val = inst[index];
            if (val === undefined) continue;
            enabled = val;
            break;
        }
        lastIndex = m.index;

        if (!enabled) continue;
        multi += toNumber(m[1]) * toNumber(m[2]);
    }

    return multi;
}
