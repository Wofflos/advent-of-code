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
            for (let j = i + 1; j < ants.length; j++) {
                let [bx, by] = ants[j];
                let [dx, dy] = [ax - bx, ay - by];

                for (const [nx, ny] of [[ax + dx, ay + dy], [bx - dx, by - dy]]) {
                    if (isNotValid(nx, ny, grid)) continue;
                    antinodes.add([nx, ny].toString());
                }
            }
        }
    }

    return antinodes.size;
}

function isNotValid(x: number, y: number, grid: string[][]): boolean {
    return x < 0 || x >= grid.length || y < 0 || y >= grid[0].length;
}
