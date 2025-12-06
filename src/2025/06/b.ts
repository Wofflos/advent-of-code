import { readLines } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);
    const operators = lines[lines.length - 1];
    const spacing = new Array(operators.split(" ")
    .filter(Boolean).length).fill(0);

    for (let i = 0, y = -1; i < operators.length; i++) {
        if (operators[i] !== " ") {
            if (y >= 0) {
                spacing[y]--;
            }
            y++;
        }
        spacing[y]++;
    }

    const ogGrid: string[][] = lines.map((l) => {
        let c = l.split("");
        const row: string[] = [];
        let curr = "";
        for (const space of spacing) {
            for (let i = 0; i < space; i++) {
                curr += c.shift() ?? "";
            }
            if (c.length > 0) {
                c.shift();
            }
            row.push(curr);
            curr = "";
        }

        return row;
    });

    const grid: string[][] = [];
    for (let x = 0; x < ogGrid[0].length; x++) {
        let ar: string[] = [];
        for (let y = 0; y < ogGrid.length; y++) {
            let val = ogGrid[y][x];
            if (val.includes("+") || val.includes("*")) {
                ar.push(val.trim());
                continue;
            }

            val.split("").reverse().forEach((l, i) => {
                ar.splice(i, 1, (ar[i] ?? "") + l.trim());
            });
        }
        grid.push(ar);
    }

    const totals = [];

    for (const nums of grid) {
        let op = nums.pop();

        const result = nums.map(toNumber).reduce((acc, curr) => {
            if (op === "+") {
                acc += curr;
            } else if (op === "*") {
                acc *= curr;
            }
            return acc;
        }, op === "+" ? 0 : 1);
        totals.push(result);
    }

    return totals.reduce((acc, curr) => acc + curr, 0);
}
