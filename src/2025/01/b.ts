import { readLines } from "utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    let dial = 50;
    const MAX = 100;
    let zeroCount = 0;

    for (const rotation of lines) {
        const dir = rotation.charAt(0);
        let amount = parseInt(rotation.slice(1), 10);

        if (dir === "L") {
            amount *= -1;
            const div = Math.floor(amount / -MAX);
            const mod = amount % -MAX;
            zeroCount += div;
            if (dial !== 0 && mod + dial <= 0) {
                zeroCount++;
            }
        } else if (dir === "R") {
            const div = Math.floor(amount / MAX);
            const mod = amount % MAX;
            zeroCount += div;
            if (dial + mod >= MAX) {
                zeroCount++;
            }
        }

        dial = ((dial + amount) % MAX + MAX) % MAX;
    }

    return zeroCount;
}
