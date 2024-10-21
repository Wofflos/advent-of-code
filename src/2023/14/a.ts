import { readLines } from "utils";

export function solve(isTest: boolean = false) {
    const panel = readLines(import.meta.filename, isTest).map((line) => line.split(""));

    const maxLoad = panel.length;
    let load = 0;
    for (let row = 0; row < panel.length; row++) {
        for (let col = 0; col < panel[row].length; col++) {
            if (panel[row][col] === "O") {
                panel[row][col] = ".";
                let newRow = row;
                while (newRow > 0 && panel[newRow - 1][col] === ".") {
                    newRow--;
                }
                panel[newRow][col] = "O";
                load += maxLoad - newRow;
            }
        }
    }

    // console.log(`${panel.map((element) => `${element}`).join("\n")}`);
    return load;
}
