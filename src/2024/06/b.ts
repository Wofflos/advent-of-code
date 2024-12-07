import { readLines } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    const map = lines.map((l) => l.split(""));
    let [sx, sy] = startingPosition(map, "^");
    let [x, y] = [sx, sy];
    let [xp, yp] = [-1, 0];

    const path: Set<string> = new Set();

    while (true) {
        path.add([x, y].toString());
        let [n_x, n_y] = [x + xp, y + yp];

        if (isNotValid(n_x, n_y, map)) {
            break;
        }

        if (map[n_x][n_y] === "#") {
            [xp, yp] = [yp, -xp];
        } else {
            [x, y] = [n_x, n_y];
        }
    }

    let count = 0;
    for (const pos of path) {
        let [x, y] = pos.split(",").map(toNumber);

        let loop = isLoop([sx, sy], [-1, 0], [x, y], map);
        if (loop) {
            count++;
        }
    }

    return count;
}

function isLoop(
    [x, y]: number[],
    [xp, yp]: number[],
    [xo, yo]: number[],
    map: string[][],
): boolean {
    const path: Set<string> = new Set();

    while (true) {
        path.add([x, y, xp, yp].toString());
        let [n_x, n_y] = [x + xp, y + yp];

        if (isNotValid(n_x, n_y, map)) {
            break;
        }

        if (map[n_x][n_y] === "#" || ((x + xp) == xo && (y + yp) == yo)) {
            [xp, yp] = [yp, -xp];
        } else {
            [x, y] = [n_x, n_y];
            let mov = [x, y, xp, yp].toString();
            if (path.has(mov)) {
                return true;
            } else {
                path.add(mov);
            }
        }
    }

    return false;
}

function isNotValid(x: number, y: number, map: string[][]): boolean {
    return x < 0 || x >= map.length || y < 0 || y >= map[0].length;
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
