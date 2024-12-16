import { isNotValid, readLines } from "utils";

export function solve(isTest: boolean = false) {
    const grid = readLines(import.meta.filename, isTest).map((l) => l.split(""));

    const regions: [number, number][][] = [];
    const visited: Set<string> = new Set();

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (visited.has([row, col].toString())) continue;

            let steps: [number, number][] = [[row, col]];
            let region: [number, number][] = [];
            regions.push(region);

            while (steps.length) {
                let [x, y] = steps.pop() ?? [0, 0];
                let element = grid[x][y];

                if (visited.has([x, y].toString())) {
                    continue;
                }

                visited.add([x, y].toString());
                region.push([x, y]);

                for (const [r, c] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
                    if (isNotValid(r, c, grid) || visited.has([r, c].toString())) continue;

                    if (grid[r][c] === element) {
                        steps.push([r, c]);
                    }
                }
            }
        }
    }

    let fencing = 0;
    for (const region of regions) {
        let perimeter = 0;
        for (const [r, c] of region) {
            perimeter += 4;
            for (const [x, y] of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) {
                if (region.some(([ax, ay]) => ax === x && ay === y)) {
                    perimeter--;
                }
            }
        }

        fencing += region.length * perimeter;
    }

    return fencing;
}
