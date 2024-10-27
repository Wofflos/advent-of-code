import { readLines } from "utils";
import { mod } from "utils/math";

const steps = 26501365;
let org: number;

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);
    let map: string[][] = lines.map((l) => l.split(""));
    org = steps % (2 * map.length);

    const [x, y] = startingPosition(map);

    let vals: number[] = [];
    let fd: number[] = [];
    let sd: number[] = [];

    let aux = 0;
    while (true) {
        vals.push(fill(x, y, aux, map));
        aux += 1;

        if (vals.length >= 4) {
            fd = [vals[1] - vals[0], vals[2] - vals[1], vals[3] - vals[2]];
            sd = [fd[1] - fd[0], fd[2] - fd[1]];
            if (sd[0] === sd[1]) {
                break;
            } else {
                vals.shift();
            }
        }
    }

    let [u, i, o] = vals;

    let c = u;
    let a = (o - 2 * i + c) / 2;
    let b = i - c - a;

    // HyperNeutrino quadratic solution
    const calc = (val: number) => a * (val ** 2) + (b * val) + c;

    return calc(Math.floor(steps / (2 * map.length)));
}

function fill(x: number, y: number, steps: number, map: string[][]) {
    const queue: Array<[number, number, number]> = [[x, y, org + 2 * steps * map.length]];
    const seen = new Set([[x, y].toString()]);
    const ans = new Set();

    const maxRow = map.length;
    const maxCol = map[0].length;

    const getValue = (row: number, col: number) => {
        return map[mod(row, maxRow)][mod(col, maxCol)];
    };

    while (queue.length) {
        let d = queue.shift();
        if (!d) break;

        const [r, c, s] = d;

        if (s % 2 == 0) {
            ans.add([r, c].toString());
        }

        if (s == 0) continue;

        for (const [row, col] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) {
            if (getValue(row, col) === "#") continue;

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
