import { readLines } from "@utils/ts-utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(__filename, isTest);

    const line = lines[0];
    let code: string[] = [];

    let index = 1;
    for (const char of line.trim().split("")) {
        if (code.length && code.includes(char)) {
            code.splice(0, code.indexOf(char) + 1);
        }

        code.push(char);

        if (code.length === 4) {
            return index;
        }

        index++;
    }
}
