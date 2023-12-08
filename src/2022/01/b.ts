import { readFile } from "@utils/ts-utils";

export function solve(isTest: boolean = false) {
    const input = readFile(__filename, isTest);

    const threeMax: number[] = [];

    for (const line of input.replaceAll("\r", "").split("\n\n")) {
        const number = line
            .split("\n")
            .map((l) => parseInt(l.trim()))
            .reduce((a, b) => a + b, 0);

        if (threeMax.length < 3) {
            threeMax.push(number);
            threeMax.sort((a, b) => b - a);
        } else {
            const index = threeMax.findIndex((n) => n < number);
            if (index !== -1) {
                threeMax.splice(index, 0, number);
                threeMax.pop();
            }
        }
    }

    return threeMax.reduce((a, b) => a + b, 0);
}

function extra(lines: string[]) {
    const threeMax: number[] = [];

    let acc = 0;
    for (const line of lines) {
        const number = parseInt(line.trim());
        if (isNaN(number)) {
            if (threeMax.length < 3) {
                threeMax.push(acc);
                threeMax.sort((a, b) => b - a);
            } else {
                const index = threeMax.findIndex((n) => n < acc);
                if (index !== -1) {
                    threeMax.splice(index, 0, acc);
                    threeMax.pop();
                }
            }
            acc = 0;
        } else {
            acc += number;
        }
    }

    if (acc != 0) {
        const index = threeMax.findIndex((n) => n < acc);
        if (index !== -1) {
            threeMax.splice(index, 0, acc);
            threeMax.pop();
        }
    }

    return threeMax.reduce((a, b) => a + b, 0);
}
