import { readLines } from "@utils/ts-utils";

type Galaxy = {
    id: number;
    x: number;
    y: number;
};

export function solve(isTest: boolean = false) {
    const lines = readLines(__filename, isTest);
    let galaxies: { [key: string]: Galaxy } = {};
    let galaxiesCount = 0;
    const space = lines.map((line) => {
        return line.split("").map((x) => {
            return x === "#" ? ++galaxiesCount : ".";
        });
    });

    for (let col = 0; col < space[0].length; col++) {
        const column = space.map((line) => line[col]);
        if (!column.some((x) => x !== ".")) {
            space.forEach((line) => line.splice(col + 1, 0, "."));
            col++;
        }
    }

    for (let row = 0; row < space.length; row++) {
        const line = space[row];
        if (!line.some((x) => x !== ".")) {
            space.splice(row + 1, 0, Array(line.length).fill("."));
            row++;
        }
    }

    for (let row = 0; row < space.length; row++) {
        for (let col = 0; col < space[0].length; col++) {
            const cell = space[row][col];
            if (cell !== "." && !!cell) {
                galaxies[cell] = { id: cell, x: row, y: col };
            }
        }
    }

    let sumSteps = 0;

    Object.values(galaxies).forEach((g1) => {
        Object.values(galaxies).forEach((g2) => {
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
