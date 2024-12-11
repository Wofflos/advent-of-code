import { readLines } from "utils";
import { toNumber } from "utils/math";

let sizes = new Map();

export function solve(isTest: boolean = false) {
    const [line] = readLines(import.meta.filename, isTest);

    const diskMap = line.split("").map(toNumber);

    let id = 0;
    let fileSystem: (number | null)[] = [];

    for (let index = 0; index < diskMap.length; index++) {
        let val = index % 2 === 0 ? id++ : null;
        let size = diskMap[index];
        if (size < 0) continue;
        sizes.set(fileSystem.length, diskMap[index]);
        for (let j = 0; j < diskMap[index]; j++) {
            fileSystem.push(val);
        }
    }

    fileSystem = reorder(fileSystem);

    return checksum(fileSystem);
}

function reorder(fileSystem: (number | null)[]): (number | null)[] {
    for (let ridx = fileSystem.length - 1; ridx > 0; ridx--) {
        const rval = fileSystem[ridx];
        let rsize = sizes.get(ridx);
        if (rval === null) continue;

        if (!rsize) continue;

        for (let fidx = 0; fidx < fileSystem.length; fidx++) {
            const val = fileSystem[fidx];
            if (val !== null) continue;

            let fsize = sizes.get(fidx);
            if (!fsize) continue;

            if (rsize > fsize) {
                continue;
            } else if (rsize == fsize) {
                sizes.delete(fidx);
            } else {
                sizes.delete(fidx);
                sizes.set(fidx + rsize, fsize - rsize);
            }

            sizes.delete(ridx);

            if (ridx < fidx) {
                break;
            }

            fileSystem.splice(ridx, rsize, ...(new Array(rsize).fill(null)));
            fileSystem.splice(fidx, rsize, ...(new Array(rsize).fill(rval)));

            break;
        }
    }

    return fileSystem;
}

function checksum(fileSystem: (number | null)[]): number {
    return fileSystem.map((val, index) => val !== null ? (index * val) : 0)
        .reduce((a, b) => a + b, 0);
}
