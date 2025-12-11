import { readLines } from "utils";

type Vector = {
    x: number;
    y: number;
};

export function solve(isTest: boolean = false) {
    const redTiles = new Set<string>();

    const points = readLines(import.meta.filename, isTest).map((l) => {
        const [x, y] = l.split(",").map(Number);
        redTiles.add(`${x},${y}`);
        return { x, y };
    });

    let maxArea = 0;
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            if (!isValidRectangle(points, i, j)) {
                continue;
            }
            const area = calculateArea(points[i], points[j]);
            if (area > maxArea) {
                maxArea = area;
            }
        }
    }

    return maxArea;
}

function isValidRectangle(points: Vector[], idx0: number, idx1: number): boolean {
    const rect = getRect(points[idx0], points[idx1]);

    for (let i = 0; i < points.length; i++) {
        const next = (i + 1) % points.length;
        if (i === idx0 || i === idx1 || next === idx0 || next === idx1) {
            continue;
        }

        const edgeRect = getRect(points[i], points[next]);

        // AABB collision detection
        if (
            rect.left < edgeRect.right &&
            rect.right > edgeRect.left &&
            rect.top < edgeRect.bottom &&
            rect.bottom > edgeRect.top
        ) {
            return false;
        }
    }

    return true;
}

function getRect(p0: Vector, p1: Vector) {
    return {
        left: Math.min(p0.x, p1.x),
        right: Math.max(p0.x, p1.x),
        top: Math.min(p0.y, p1.y),
        bottom: Math.max(p0.y, p1.y),
    };
}

function calculateArea(a: Vector, b: Vector): number {
    const width = Math.abs(b.x - a.x) + 1;
    const height = Math.abs(b.y - a.y) + 1;
    return width * height;
}
