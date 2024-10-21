import { readLines } from "utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);
    const values: number[] = [];

    lines.forEach((line) => {
        let numbers = line
            .replaceAll(/\D/g, "")
            .split("")
            .map((n) => parseInt(n))
            .filter(Boolean)
            .filter((n) => !isNaN(n));

        const first = numbers.shift() ?? 0;
        const second = numbers.pop() ?? first;
        values.push(first * 10 + second);
    });

    return values.reduce((acc, curr) => acc + curr, 0);
}
