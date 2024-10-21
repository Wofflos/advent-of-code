import { readLines } from "utils";

export function solve(isTest: boolean = false) {
    const sequences = readLines(import.meta.filename, isTest)[0].split(",");

    let sumHashes = 0;

    for (const sequence of sequences) {
        sumHashes += hash(sequence);
    }

    return sumHashes;
}

function hash(s: string) {
    let value = 0;
    for (const c of s) {
        value = ((c.charCodeAt(0) + value) * 17) % 256;
    }
    return value;
}
