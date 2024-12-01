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

    const map: Map<number, number> = new Map();

    let score = 0;
    for (const n of listA) {
        if (!map.has(n)) {
            map.set(n, listB.filter((a) => a === n).length);
        }

        score += n * (map.get(n) ?? 0);
    }

    return score;
}
