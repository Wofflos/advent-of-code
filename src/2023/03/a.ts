import { readFile } from "utils";

export function solve(isTest: boolean = false) {
    const input = readFile(import.meta.filename, isTest);
    const lines = input.replaceAll("\r", "").split("\n");

    const numbers: number[] = [];
    const numbersIndex = new Set<string>();

    lines.forEach((line, indexRow) => {
        line.split("").forEach((char, indexCol) => {
            if (char === "." || !isNaN(parseInt(char))) {
                return;
            }

            for (const row of [indexRow - 1, indexRow, indexRow + 1]) {
                for (let col of [indexCol - 1, indexCol, indexCol + 1]) {
                    if (
                        row < 0 ||
                        row >= lines.length ||
                        col < 0 ||
                        col >= line.length ||
                        isNaN(parseInt(lines[row][col]))
                    ) {
                        continue;
                    }

                    while (col > 0 && !isNaN(parseInt(lines[row][col - 1]))) col--;

                    numbersIndex.add(`${row}|${col}`);
                }
            }
        });
    });

    numbersIndex.forEach((index) => {
        let [row, col] = index.split("|").map((i) => parseInt(i));
        let number = 0;
        while (col <= lines[row].length && !isNaN(parseInt(lines[row][col]))) {
            number = number * 10 + parseInt(lines[row][col]);
            col++;
        }

        numbers.push(number);
    });

    return numbers.reduce((a, b) => a + b, 0);
}
