import { readLines } from "utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    const grid = lines.map((l) => l.split(""));

    const antennas: Map<string, [[number, number]]> = new Map();

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            const val = grid[row][col];
            if (val === ".") continue;

            if (antennas.has(val)) {
                antennas.get(val)?.push([row, col]);
            } else {
                antennas.set(val, [[row, col]]);
            }
        }
    }

    const antinodes: Set<string> = new Set();

    for (const [_type, ants] of antennas.entries()) {
        for (let i = 0; i < ants.length - 1; i++) {
            let [ax, ay] = ants[i];
            if (ants.length > 1) {
                antinodes.add([ax, ay].toString());
            }

            for (let j = i + 1; j < ants.length; j++) {
                let [bx, by] = ants[j];
                let [dx, dy] = [ax - bx, ay - by];

                antinodes.add([bx, by].toString());

                let [nax, nay] = [ax + dx, ay + dy];
                while (true) {
                    if (isNotValid(nax, nay, grid)) break;
                    antinodes.add([nax, nay].toString());
                    [nax, nay] = [nax + dx, nay + dy];
                }

                let [nbx, nby] = [bx - dx, by - dy];
                while (true) {
                    if (isNotValid(nbx, nby, grid)) break;
                    antinodes.add([nbx, nby].toString());
                    [nbx, nby] = [nbx - dx, nby - dy];
                }
            }
        }
    }

    return antinodes.size;
}

function isNotValid(x: number, y: number, grid: string[][]): boolean {
    return x < 0 || x >= grid.length || y < 0 || y >= grid[0].length;
}
