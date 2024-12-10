import { readLines } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const [line] = readLines(import.meta.filename, isTest);

    const diskMap = line.split("").map(toNumber);

    let id = 0;
    let fileSystem: (number | null)[] = [];

    for (let index = 0; index < diskMap.length; index++) {
        let val = index % 2 === 0 ? id++ : null;
        for (let j = 0; j < diskMap[index]; j++) {
            fileSystem.push(val);
        }
    }

    fileSystem = reorder(fileSystem);

    return checksum(fileSystem.filter((a) => a !== null));
}

function reorder(fileSystem: (number | null)[]): (number | null)[] {
    for (let fidx = 0; fidx < fileSystem.length; fidx++) {
        const val = fileSystem[fidx];
        if (val !== null) continue;

        for (let ridx = fileSystem.length - 1; ridx > 0; ridx--) {
            const rval = fileSystem[ridx];
            if (rval !== null) {
                if (ridx <= fidx) return fileSystem;
                fileSystem[fidx] = rval;
                fileSystem[ridx] = null;
                break;
            }
        }
    }

    return fileSystem;
}

function checksum(fileSystem: number[]): number {
    return fileSystem.map((val, index) => index * val)
        .reduce((a, b) => a + b, 0);
}
