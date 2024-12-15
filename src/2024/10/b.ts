import { isNotValid, readLines } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const grid = readLines(import.meta.filename, isTest).map((l) => l.split("").map(toNumber));

    let scores = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            const element = grid[row][col];
            if (element === 0) {
                scores += trail(row, col, grid);
            }
        }
    }

    return scores;
}

function trail(x: number, y: number, grid: number[][]): number {
    const steps: [[number, number, number]] = [[x, y, 0]];

    let trails = 0;

    while (steps.length > 0) {
        let [r, c, num] = steps.pop() ?? [];
        if (r == undefined || c == undefined || num == undefined) continue;

        if (num === 9) {
            trails++;
            continue;
        }
        let nextNum = num + 1;

        for (const [row, col] of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) {
            if (isNotValid(row, col, grid)) continue;

            let score = grid[row][col];
            if (isNaN(score)) continue;

            if (score === nextNum) {
                steps.push([row, col, score]);
            }
        }
    }

    return trails;
}
