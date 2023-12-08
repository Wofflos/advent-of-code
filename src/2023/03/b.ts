import { readFile } from "@utils/ts-utils";

export function solve(isTest: boolean = false) {
    const input = readFile(__filename, isTest);
    const lines = input.replaceAll("\r", "").split("\n");

    const ratios: number[] = [];
    const gears = new Map<string, Set<string>>();

    lines.forEach((line, indexRow) => {
        line.split("").forEach((char, indexCol) => {
            // if (char === "." || !isNaN(parseInt(char))) {
            if (char !== "*") {
                return;
            }

            gears.set(`${indexRow}|${indexCol}`, new Set<string>());

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

                    gears.get(`${indexRow}|${indexCol}`)?.add(`${row}|${col}`);
                }
            }
        });
    });

    [...gears.values()].forEach((gear) => {
        if (gear.size < 2) {
            return;
        }
        let ratio = 1;

        gear.forEach((index) => {
            let [row, col] = index.split("|").map((i) => parseInt(i));
            let number = 0;
            while (col <= lines[row].length && !isNaN(parseInt(lines[row][col]))) {
                number = number * 10 + parseInt(lines[row][col]);
                col++;
            }

            ratio *= number;
        });

        ratios.push(ratio);
    });

    return ratios.reduce((a, b) => a + b, 0);
}
