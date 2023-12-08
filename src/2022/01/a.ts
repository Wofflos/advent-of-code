import { readLines } from "@utils/ts-utils";

export function solve(isTest: boolean = false) {
    console.log("Solving 01-2022 Part a ╰(*°▽°*)╯ 🎄");
    const lines = readLines(__filename, isTest);

    let max = 0;
    let acc = 0;
    for (const line of lines) {
        const number = parseInt(line.trim());
        if (isNaN(number)) {
            if (acc > max) {
                max = acc;
            }
            acc = 0;
        } else {
            acc += number;
        }
    }

    return max;
}
