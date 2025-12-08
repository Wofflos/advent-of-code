import { isNotValid, readLines } from "utils";

export function solve(isTest: boolean = false) {
    const grid = readLines(import.meta.filename, isTest).map((l) => l.split(""));

    let split = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            let val = grid[y][x];
            if (val === "|" || val === "S") {
                if (isNotValid(x, y + 1, grid)) {
                    continue;
                }

                let nextVal = grid[y + 1][x];

                if (nextVal === "^") {
                    split++;

                    if (!isNotValid(x - 1, y + 1, grid) && grid[y + 1][x - 1] !== "^") {
                        grid[y + 1][x - 1] = "|";
                    }

                    if (!isNotValid(x + 1, y + 1, grid) && grid[y + 1][x + 1] !== "^") {
                        grid[y + 1][x + 1] = "|";
                    }
                } else {
                    grid[y + 1][x] = "|";
                }
            }
        }
    }

    return split;
}
