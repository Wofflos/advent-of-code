import { readLines } from "utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);
    let map: string[][] = lines.map((l) => l.split(""));

    const [x, y] = startingPosition(map);

    const queue: Array<[number, number, number]> = [[x, y, 64]];
    const seen = new Set([[x, y].toString()]);
    const ans = new Set();

    while (queue.length) {
        let d = queue.shift();
        if (!d) break;

        const [r, c, s] = d;

        if (s % 2 == 0) {
            ans.add([r, c].toString());
        }

        if (s == 0) continue;

        for (const [row, col] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) {
            if (
                row < 0 || col < 0 ||
                row >= map.length || col >= map[0].length ||
                map[row][col] === "#"
            ) {
                continue;
            }

            const rc = [row, col].toString();
            if (seen.has([row, col].toString())) continue;

            seen.add(rc);
            queue.push([row, col, s - 1]);
        }
    }

    return ans.size;
}

function startingPosition(map: string[][]) {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            if (map[row][col] === "S") {
                return [row, col];
            }
        }
    }
    return [0, 0];
}
