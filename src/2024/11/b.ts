import { readFile } from "utils";
import { toNumber } from "utils/math";

const cache = new Map<string, number>();
export function solve(isTest: boolean = false) {
    let stones = readFile(import.meta.filename, isTest).split(" ").map(toNumber);

    let count = 0;
    for (const stone of stones) {
        count += blink(stone, 75);
    }

    return count;
}

function blink(stone: number, step: number): number {
    let key = `${stone},${step}`;
    if (cache.has(key)) {
        return cache.get(key) ?? 0;
    }

    if (step === 0) {
        return 1;
    }

    let val = 0;

    if (stone === 0) {
        val = blink(1, step - 1);
    } else if (stone.toString().length % 2 === 0) {
        let s = stone.toString();
        val = blink(toNumber(s.substring(0, s.length / 2)), step - 1) +
            blink(toNumber(s.substring(s.length / 2)), step - 1);
    } else {
        val = blink(stone * 2024, step - 1);
    }

    cache.set(key, val);

    return val;
}
