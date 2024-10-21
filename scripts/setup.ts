import { mkdirSync, existsSync } from "node:fs";
import { validateArgs } from "utils";

const template = `import { readLines } from "utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);
    console.log(lines);
}`;

function setup() {
    const { year, leftPaddedDay, force } = validateArgs();

    console.log(`🎄Creating files for ${leftPaddedDay}-${year} 🎄`);

    const dataPath = `./data/${year}/${leftPaddedDay}`;
    const srcPath = `./src/${year}/${leftPaddedDay}`;
    const parts = ["a", "b"];

    mkdirSync(dataPath, { recursive: true });
    createFile(`${dataPath}/input-test.txt`);
    createFile(`${dataPath}/input.txt`);

    parts.forEach((part) => {
        mkdirSync(srcPath, { recursive: true });
        createFile(`${srcPath}/${part}.ts`, template, force);
    });

    console.log(`🎄Done creating files for ${leftPaddedDay}-${year} 🎄`);
}

function createFile(path: string, content: string = "", force: boolean = false) {
    if (!force && existsSync(path)) {
        console.log(`File ${path} already exists, skipping 🎅`);
    } else {
        Deno.writeTextFileSync(path, content);
        console.log(`${force ? "💪" : ""} Created file ${path} 🤶`);
    }
}

setup();
