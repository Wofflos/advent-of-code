import { readFile } from "utils";

export function solve(isTest: boolean = false) {
    const input = readFile(import.meta.filename, isTest);
    const patterns = input
        .replaceAll("\r", "")
        .split("\n\n")
        .map((pattern) => pattern.split("\n").map((line) => line.split("")));

    let number = 0;
    for (const pattern of patterns) {
        const verticalReflection = findVerticalReflection(pattern);
        const horizontalReflection = findHorizontalReflection(pattern);
        number += verticalReflection;
        number += horizontalReflection * 100;
    }

    return number;
}

function findVerticalReflection(pattern: string[][]) {
    for (let col = 0; col < pattern[0].length; col++) {
        if (
            compareVerticalPatterns(
                pattern.map((l) => l.slice(0, col + 1).reverse()),
                pattern.map((l) => l.slice(col + 1)),
            )
        ) {
            return col + 1;
        }
    }

    return 0;
}

function compareVerticalPatterns(pattern1: string[][], pattern2: string[][]) {
    let minColLength = Math.min(pattern1[0].length, pattern2[0].length);
    if (!minColLength) {
        return false;
    }

    let diff = 0;
    for (let row = 0; row < pattern1.length; row++) {
        for (let col = 0; col < minColLength; col++) {
            if (pattern1[row][col] !== pattern2[row][col]) {
                diff++;
            }

            if (diff > 1) {
                return false;
            }
        }
    }

    if (diff === 0) {
        return false;
    }
    return true;
}

function findHorizontalReflection(pattern: string[][]) {
    for (let row = 0; row < pattern.length; row++) {
        if (compareHorizonaltaPattern(pattern.slice(0, row + 1).reverse(), pattern.slice(row + 1))) {
            return row + 1;
        }
    }

    return 0;
}

function compareHorizonaltaPattern(pattern1: string[][], pattern2: string[][]) {
    let minRowLength = Math.min(pattern1.length, pattern2.length);
    if (!minRowLength) {
        return false;
    }

    let diff = 0;

    for (let row = 0; row < minRowLength; row++) {
        for (let col = 0; col < pattern1[0].length; col++) {
            if (pattern1[row][col] !== pattern2[row][col]) {
                diff++;
            }

            if (diff > 1) {
                return false;
            }
        }
    }

    if (diff === 0) {
        return false;
    }

    return true;
}
