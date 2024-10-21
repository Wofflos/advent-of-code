import { readLines } from "utils";

const _shapes: { [key: string]: string } = {
    A: "X", // Rock
    B: "Y", // Paper
    C: "Z", // Scissors
};

const points: { [key: string]: number } = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
};

// A beats C, C beats B, B beats A
// 1 beats 3, 3 beats 2, 2 beats 1
// 1-3 = -2, 3-2 = 1, 2-1 = 1

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);
    let score = 0;
    for (const line of lines) {
        const [player1, player2] = line.trim().split(" ");

        score += points[player2];
        const diff = points[player1] - points[player2];

        if (diff === 0) {
            score += 3;
        } else if (diff === -1 || diff === 2) {
            score += 6;
        }

        // else if (diff === -2 || diff === 1) {
        //     //lose
        // }
    }

    return score;
}
