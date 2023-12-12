import { readLines } from "@utils/ts-utils";

type Galaxy = {
    id: number;
    x: number;
    ox: number;
    y: number;
    oy: number;
};

const EXPANSION = 1_000_000;
const REAL_EXPANSION = EXPANSION - 1;

export function solve(isTest: boolean = false) {
    const lines = readLines(__filename, isTest);
    let galaxies: Galaxy[] = [];
    let galaxiesCount = 0;
    const space = lines.map((line) => {
        return line.split("").map((x) => {
            return x === "#" ? ++galaxiesCount : ".";
        });
    });

    for (let row = 0; row < space.length; row++) {
        for (let col = 0; col < space[0].length; col++) {
            const cell = space[row][col];
            if (cell !== "." && !!cell) {
                galaxies.push({ id: cell, x: row, y: col, ox: row, oy: col });
            }
        }
    }

    for (let row = 0; row < space.length; row++) {
        const line = space[row];
        if (!line.some((x) => x !== ".")) {
            galaxies.forEach((g) => {
                if (g.ox >= row) {
                    g.x = g.x + REAL_EXPANSION;
                }
            });
        }
    }

    for (let col = 0; col < space[0].length; col++) {
        const column = space.map((line) => line[col]);
        if (!column.some((x) => x !== ".")) {
            galaxies.forEach((g) => {
                if (g.oy >= col) {
                    g.y = g.y + REAL_EXPANSION;
                }
            });
        }
    }

    let sumSteps = 0;

    galaxies.forEach((g1) => {
        galaxies.forEach((g2) => {
            if (g1.id !== g2.id) {
                const steps = getStepsBetweenGalaxies(g1, g2);
                sumSteps += steps;
            }
        });
    });

    return sumSteps / 2;
}

function getStepsBetweenGalaxies(galaxy1: Galaxy, galaxy2: Galaxy) {
    return Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y);
}
