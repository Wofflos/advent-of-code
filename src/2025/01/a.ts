import { readLines } from "utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    let dial = 50;
    const MAX = 100;
    let zeroCount = 0;

    for (const rotation of lines) {
        const dir = rotation.charAt(0);
        const amount = parseInt(rotation.slice(1), 10);

        if (dir === "L") {
            dial = ((dial - amount) % MAX + MAX) % MAX;
        } else if (dir === "R") {
            dial = ((dial + amount) % MAX + MAX) % MAX;
        }

        if (dial === 0) {
            zeroCount++;
        }
    }

    return zeroCount;
}
