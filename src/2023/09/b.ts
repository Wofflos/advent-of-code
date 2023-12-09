import { readLines, toNumber } from "@utils/ts-utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(__filename, isTest);

    const previousValues: number[] = [];
    const historyValues: Map<number, Array<number[]>> = new Map();

    lines.forEach((line, index) => {
        const values: Array<number[]> = [];
        values.push([...line.split(" ").map(toNumber)]);

        let difference = getDiference(values[0]);
        values.push(difference);

        while (difference.some((v) => v !== 0)) {
            difference = getDiference(difference);
            values.push(difference);
        }

        historyValues.set(index, values);
        previousValues.push(getPreviousValue(values));
    });

    return previousValues.reduce((acc, v) => acc + v, 0);
}

function getDiference(values: number[]) {
    const result = [];
    for (let i = 0; i < values.length - 1; i++) {
        result.push(values[i + 1] - values[i]);
    }
    return result;
}

function getPreviousValue(history: Array<number[]>) {
    let previous = 0;

    for (let i = history.length - 1; i >= 0; i--) {
        previous = history[i][0] - previous;
        history[i].unshift(previous);
    }

    return previous;
}
