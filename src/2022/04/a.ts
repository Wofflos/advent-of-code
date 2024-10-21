import { readLines } from "utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    let count = 0;
    for (const line of lines) {
        const [first, second] = line.trim().split(",");
        const [firstX, firstY] = first.split("-").map((a) => parseInt(a));
        const [secondX, secondY] = second.split("-").map((a) => parseInt(a));

        //secondX firstX  firstY secondY || firstX secondX  secondY firstY

        if ((firstX >= secondX && firstY <= secondY) || (secondX >= firstX && secondY <= firstY)) {
            count++;
        }
    }

    return count;
}
