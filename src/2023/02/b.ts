import { readLines } from "utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    const powerSets: number[] = [];

    lines.forEach((line) => {
        let l = line.split(":");
        const gameValues: { [key: string]: number } = {};

        const _colors = l[1]
            .split(";")
            .flatMap((ss) => ss.split(",").map((c) => c.trim()))
            .forEach((color) => {
                let c = color.split(" ");
                let colorName: string = c[1];
                let colorValue = parseInt(c[0]);

                if (colorValue > (gameValues[colorName] ?? 0)) {
                    gameValues[colorName] = colorValue || 0;
                }
            });

        powerSets.push(gameValues.red * gameValues.green * gameValues.blue);
    });

    return powerSets.reduce((a, b) => a + b, 0);
}
