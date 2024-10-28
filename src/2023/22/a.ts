import { readLines } from "utils";
import { toNumber } from "utils/math";

type Point = {
    x: number;
    y: number;
    z: number;
};

type Brick = {
    start: Point;
    end: Point;
    supports: Brick[];
    supported: Brick[];
};

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    const bricks: Brick[] = [];

    for (const line of lines) {
        let [start, end] = line.split("~");
        const brick = { start: getPoint(start), end: getPoint(end), supports: [], supported: [] };
        bricks.push(brick);
    }

    bricks.sort((a, b) => a.start.z - b.start.z);

    for (const [index, brick] of bricks.entries()) {
        let maxZ = 1;
        for (const cb of bricks.slice(0, index)) {
            if (overlaps(brick, cb)) {
                maxZ = Math.max(maxZ, cb.end.z + 1);
            }
        }

        brick.end.z -= brick.start.z - maxZ;
        brick.start.z = maxZ;
    }

    for (const [index, upper] of bricks.entries()) {
        for (const lower of bricks.slice(0, index)) {
            if (overlaps(upper, lower) && upper.start.z === lower.end.z + 1) {
                upper.supported.push(lower);
                lower.supports.push(upper);
            }
        }
    }

    return bricks.filter((b) => !b.supports.some((bs) => bs.supported.length === 1)).length;
}

function getPoint(str: string): Point {
    let [x, y, z] = str.split(",").map(toNumber);
    return { x, y, z };
}

function overlaps(a: Brick, b: Brick) {
    return Math.max(a.start.x, b.start.x) <= Math.min(a.end.x, b.end.x) &&
        Math.max(a.start.y, b.start.y) <= Math.min(a.end.y, b.end.y);
}
