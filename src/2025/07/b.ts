import { isNotValid, memoize, readLines } from "utils";

export function solve(isTest: boolean = false) {
    const grid = readLines(import.meta.filename, isTest).map((l) => l.split(""));

    let travelMemo = memoize(travel);
    function travel(y: number, x: number): number {
        if (isNotValid(y, x, grid)) {
            return 0;
        }

        if (y === (grid.length - 1)) {
            return 1;
        }

        if (grid[y][x] === "^") {
            return travelMemo(y, x - 1) + travelMemo(y, x + 1);
        }

        return travelMemo(y + 1, x);
    }

    return travel(0, grid[0].indexOf("S"));
}
