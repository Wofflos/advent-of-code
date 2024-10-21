import { parseArgs } from "@std/cli/parse-args";
import { sep } from "node:path";

function parseFilename(filename: string) {
    const escapedSep = sep === "\\" ? "\\\\" : "\\" + sep;
    const regex = new RegExp(
        `src${escapedSep}(?<year>[0-9]{4})${escapedSep}(?<day>[0-9]{2})${escapedSep}(?<part>[a|b]).ts`,
        "g",
    );

    const groups = regex.exec(filename)?.groups;

    if (!groups) {
        console.log("Error parsing data file");
        Deno.exit(0);
    }

    const { day, part, year } = groups;
    return { day, part, year };
}

export function readFile(filename: string|undefined, test: boolean = false) {
    if(!filename) {
        console.log("Error filename")
        Deno.exit(0);
    }

    const { day, year } = parseFilename(filename);
    return Deno.readTextFileSync(`.${sep}data${sep}${year}${sep}${day}${sep}input${test ? "-test" : ""}.txt`);
}

export function readLines(filename: string|undefined, test: boolean = false) {
    if(!filename) {
        console.log("Error filename")
        Deno.exit(0);
    }

    return readFile(filename, test).replaceAll("\r", "").split("\n");
}

export function validateArgs() {
    const argvs = parseArgs(Deno.args);

    const day = argvs.day ?? new Date().getDate();

    if (isNaN(day) || day < 1 || day > 25) {
        console.log("Please provide a valid day number");
        Deno.exit(0);
    }

    const year = argvs.year ?? new Date().getFullYear();

    if (isNaN(year)) {
        console.log("Please provide a valid year");
        Deno.exit(0);
    }

    return {
        day,
        year,
        leftPaddedDay: day.toString().padStart(2, "0"),
        test: argvs.test ?? false,
        force: argvs.force ?? false,
        part: argvs.part ?? "a",
    };
}
