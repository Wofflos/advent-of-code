import { readLines } from "utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    const map = lines.map((l) => l.split(""));
    let patrol = true;
    let [x, y] = startingPosition(map, "^");
    let [xp, yp] = [-1, 0];

    const path: Set<string> = new Set([[x, y].toString()]);

    while (patrol) {
        let pos = map[x + xp]?.[y + yp] ?? null;
        if (!pos) break;

        if (pos === "#") {
            [xp, yp] = [yp, -xp];
        }

        x += xp;
        y += yp;

        if (x < 0 || x >= map.length || y < 0 || y >= map[0].length) {
            patrol = false;
        } else {
            path.add([x, y].toString());
        }
    }

    return path.size;
}

function startingPosition(map: string[][], letter: string): number[] {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            if (map[row][col] === letter) {
                return [row, col];
            }
        }
    }

    return [0, 0];
}
