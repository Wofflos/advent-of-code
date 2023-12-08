import { readLines } from "@utils/ts-utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(__filename, isTest);
    console.log(lines);
}