import { readLines } from "utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);
    const m: string[][] = lines.map((l) => l.split(""));

    let count = 0;
    for (let row = 0; row < m.length; row++) {
        for (let col = 0; col < m[0].length; col++) {
            const letter = m[row][col];
            if (letter !== "A") continue;

            let a = m[row - 1]?.[col - 1];
            let b = m[row - 1]?.[col + 1];
            let c = m[row + 1]?.[col - 1];
            let d = m[row + 1]?.[col + 1];

            if (!a || !b || !c || !d) continue;

            if (
                ((a == "M" && d == "S") || (a == "S" && d == "M")) &&
                ((b == "M" && c == "S") || (b == "S" && c == "M"))
            ) {
                count++;
            }
        }
    }

    return count;
}
