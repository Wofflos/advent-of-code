import { readLines } from "@utils/ts-utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(__filename, isTest);

    const game = {
        red: 12,
        green: 13,
        blue: 14,
    };

    const possibleGames: number[] = [];

    lines.forEach((line) => {
        let l = line.split(":");
        const gameValues: { [key: string]: number } = {};

        const colors = l[1]
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

        if (gameValues.red <= game.red && gameValues.green <= game.green && gameValues.blue <= game.blue) {
            possibleGames.push(parseInt(l[0].split(" ")[1]));
        }
    });

    return possibleGames.reduce((a, b) => a + b, 0);
}
