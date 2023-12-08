import { readLines } from "@utils/ts-utils";

const points: { [key: string]: number } = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
};

// X: "lose",
// Y: "draw",
// Z: "win",

// A beats C, C beats B, B beats A
// 1 beats 3, 3 beats 2, 2 beats 1
// 1-3 = -2, 3-2 = 1, 2-1 = 1

const shapes = ["A", "C", "B"];

export function solve(isTest: boolean = false) {
    const lines = readLines(__filename, isTest);
    let score = 0;
    for (const line of lines) {
        const [player1, result] = line.trim().split(" ");

        let player2 = "";
        if (result === "Y") {
            player2 = player1;
            score += 3;
        } else if (result === "X") {
            player2 = shapes.indexOf(player1) === 2 ? shapes[0] : shapes[shapes.indexOf(player1) + 1];
        } else if (result === "Z") {
            player2 = shapes.indexOf(player1) === 0 ? shapes[2] : shapes[shapes.indexOf(player1) - 1];
            score += 6;
        }

        score += points[player2];
    }

    return score;
}
