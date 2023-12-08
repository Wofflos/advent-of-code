import { readLines } from "@utils/ts-utils";

//A-Z 38 (65-90)
//a-z 96 (97-122)
export function solve(isTest: boolean = false) {
    const lines = readLines(__filename, isTest);

    let priorities = 0;

    const groups: Array<string[]> = [];

    let count = 0;
    const group: string[] = [];
    for (const line of lines) {
        group.push(line);
        count++;

        if (count === 3) {
            groups.push([...group]);
            group.length = 0;
            count = 0;
        }
    }

    for (const group of groups) {
        const [a, b, c] = group;
        let type = 0;
        for (const bLetter of b.split("")) {
            if (a.includes(bLetter) && c.includes(bLetter)) {
                type = bLetter.charCodeAt(0);
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
