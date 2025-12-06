import { readFile } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const [rangesStr, idsStr] = readFile(import.meta.filename, isTest).split("\n\n");

    const ids = idsStr.split("\n").map((id) => toNumber(id));
    const ranges = rangesStr.split("\n").map((line) => {
        const [min, max] = line.split("-").map(toNumber);
        return { min, max };
    });

    let count = 0;
    for (const id of ids) {
        let valid = false;
        for (const range of ranges) {
            if (id >= range.min && id <= range.max) {
                valid = true;
                break;
            }
        }
        if (valid) {
            count++;
        }
    }

    return count;
}
