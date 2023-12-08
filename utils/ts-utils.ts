import { readFileSync } from "fs";
import { sep } from "path";
import { exit } from "process";

function parseFilename(filename: string) {
    const escapedSep = sep === "\\" ? "\\\\" : "\\" + sep;
    const regex = new RegExp(
        `(?<year>[0-9]{4})${escapedSep}src${escapedSep}(?<day>[0-9]{2})${escapedSep}(?<part>[a|b]).ts`,
        "g",
    );

    const groups = regex.exec(filename)?.groups;

    if (!groups) {
        console.log("Error parsing data file");
        exit(0);
    }

    const { day, part, year } = groups;
    return { day, part, year };
}

export function readFile(filename: string, test: boolean = false) {
    const { day, year } = parseFilename(filename);
    return readFileSync(`.${sep}data${sep}${year}${sep}${day}${sep}input${test ? "-test" : ""}.txt`, "utf8");
}

export function readLines(filename: string, test: boolean = false) {
    return readFile(filename, test).replaceAll("\r", "").split("\n");
}

export function validateArgs(dayPosition: number = 2, yearPosition: number = 3) {
    const argvs: string[] = [];
    const namedArgs: { [key: string]: boolean } = {};

    process.argv.forEach((arg) => {
        if (arg.startsWith("--")) {
            const name = arg.slice(2);
            namedArgs[name] = true;
        } else {
            argvs.push(arg);
        }
    });

    const day = argvs[dayPosition] ? parseInt(argvs[dayPosition]) : new Date().getDate();

    if (isNaN(day) || day < 1 || day > 25) {
        console.log("Please provide a valid day number");
        exit(0);
    }

    const year = argvs[yearPosition] ? parseInt(argvs[yearPosition]) : new Date().getFullYear();

    if (isNaN(year)) {
        console.log("Please provide a valid year");
        exit(0);
    }

    return { day, year, leftPaddedDay: day.toString().padStart(2, "0"), namedArgs };
}

export function toNumber(s: string) {
    return parseInt(s.trim());
}
