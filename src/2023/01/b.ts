import { readLines } from "@utils/ts-utils";

const regex = new RegExp(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g);
const validNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

export function solve(isTest: boolean = false) {
    const lines = readLines(__filename, isTest);
    const values: number[] = [];

    lines.forEach((line) => {
        const numbers = transformLineIntoNumbers(line);
        const first = numbers.shift() ?? 0;
        const second = numbers.pop() ?? first;
        values.push(first * 10 + second);
    });

    return values.reduce((acc, curr) => acc + curr, 0);
}

function transformLineIntoNumbers(line: string) {
    return [...line.matchAll(regex)]
        .map((m) => m[1])
        .map((m) => {
            if (validNumbers.includes(m)) {
                return validNumbers.indexOf(m) + 1;
            } else {
                return parseInt(m);
            }
        });
}

function extra(line: string) {
    line = line.replaceAll("one", "one1one");
    line = line.replaceAll("two", "two2two");
    line = line.replaceAll("three", "three3three");
    line = line.replaceAll("four", "four4four");
    line = line.replaceAll("five", "five5five");
    line = line.replaceAll("six", "six6six");
    line = line.replaceAll("seven", "seven7seven");
    line = line.replaceAll("eight", "eight8eight");
    line = line.replaceAll("nine", "nine9nine");

    return line
        .replaceAll(/\D/g, "")
        .split("")
        .map((n) => parseInt(n))
        .filter(Boolean)
        .filter((n) => !isNaN(n));
}
