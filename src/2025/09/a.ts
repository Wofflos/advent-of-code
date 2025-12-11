import { readLines } from "utils";

type Vector = {
    x: number;
    y: number;
};

export function solve(isTest: boolean = false) {
    const points = readLines(import.meta.filename, isTest).map((l) => {
        const [x, y] = l.split(",").map(Number);
        return { x, y };
    });

    let maxArea = 0;
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const area = calculateArea(points[i], points[j]);
            if (area > maxArea) {
                maxArea = area;
            }
        }
    }

    return maxArea;
}

function calculateArea(a: Vector, b: Vector): number {
    const width = Math.abs(b.x - a.x) + 1;
    const height = Math.abs(b.y - a.y) + 1;
    return width * height;
}
