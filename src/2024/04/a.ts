import { readLines } from "utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);
    const m: string[][] = lines.map((l) => l.split(""));

    const XMAS = "XMAS";
    let count = 0;

    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let row = 0; row < m.length; row++) {
        for (let col = 0; col < m[0].length; col++) {
            const letter = m[row][col];
            if (letter !== "X") continue;

            for (const [x, y] of directions) {
                let word = letter;
                for (let i = 1; i < 4; i++) {
                    let nx = row + (x * i);
                    let ny = col + (y * i);

                    if (nx < 0 || ny < 0 || nx >= m.length || ny >= m[0].length) {
                        break;
                    }

                    word += m[nx][ny];
                    if (!XMAS.includes(word)) break;
                }
                if (word.length == 4 && XMAS == word) {
                    count++;
                }
            }
        }
    }

    return count;
}
