import { readLines } from "@utils/ts-utils";

//A-Z 38 (65-90)
//a-z 96 (97-122)
export function solve(isTest: boolean = false) {
    const lines = readLines(__filename, isTest);

    let priorities = 0;

    for (const line of lines) {
        const a = line.slice(0, line.length / 2);
        const b = line.slice(line.length / 2);

        const bLetters = b.split("");

        let type = 0;
        for (const letter of bLetters) {
            if (a.includes(letter)) {
                type = letter.charCodeAt(0);
                break;
            }
        }

        if (type > 96) {
            priorities += type - 96;
        } else {
            priorities += type - 38;
        }
    }

    return priorities;
}
