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
        const corners: Array<[number, number]> = [];
        for (const [r, c] of region) {
            for (
                const [x, y] of [[r - .5, c - .5], [r + .5, c - .5], [r + .5, c + .5], [
                    r - .5,
                    c + .5,
                ]]
            ) {
                if (!corners.some(([ax, ay]) => ax === x && ay === y)) {
                    corners.push([x, y]);
                }
            }
        }

        let sides = 0;
        for (const [cr, cc] of corners) {
            const config = [
                region.some(([ax, ay]) => ax === cr - .5 && ay === cc - .5),
                region.some(([ax, ay]) => ax === cr + .5 && ay === cc - .5),
                region.some(([ax, ay]) => ax === cr + .5 && ay === cc + .5),
                region.some(([ax, ay]) => ax === cr - .5 && ay === cc + .5),
            ];

            let number = config.reduce((a, b) => a + (b ? 1 : 0), 0);
            if (number === 1) sides++;
            else if (number === 2) {
                let cstr = config.toString();
                if (cstr === "true,false,true,false" || cstr === "false,true,false,true") {
                    sides += 2;
                }
            } else if (number === 3) sides += 1;
        }

        fencing += region.length * sides;
    }

    return fencing;
}
