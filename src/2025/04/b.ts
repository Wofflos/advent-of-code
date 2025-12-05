import { isNotValid, readLines } from "utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    const grid: string[][] = lines.map((l) => l.split(""));

    let rolls = 0;
    let gridModified = true;
    while (gridModified) {
        gridModified = false;

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                const cell = grid[y][x];
                if (cell !== "@") {
                    continue;
                }

                let count = 0;

                for (const nx of [x - 1, x, x + 1]) {
                    for (const ny of [y - 1, y, y + 1]) {
                        if ((nx === x && ny === y) || isNotValid(nx, ny, grid)) {
                            continue;
                        }

                        if (grid[ny][nx] === "@") {
                            count++;
                        }
                    }
                }

                if (count < 4) {
                    grid[y][x] = "x";
                    gridModified = true;
                    rolls++;
                }
            }
        }
    }

    return rolls;
}
