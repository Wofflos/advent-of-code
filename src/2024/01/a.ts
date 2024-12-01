import { readLines } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);
    const listA: number[] = [];
    const listB: number[] = [];

    lines.forEach((l) => {
        const ab: string[] = l.split("   ");
        listA.push(toNumber(ab[0]));
        listB.push(toNumber(ab[1]));
    });

    listA.sort();
    listB.sort();

    let diff = 0;
    for (let index = 0; index < lines.length; index++) {
        diff += Math.abs(listA[index] - listB[index]);
    }

    return diff;
}
