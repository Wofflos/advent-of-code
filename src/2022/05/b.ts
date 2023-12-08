import { readFile } from "@utils/ts-utils";

export function solve(isTest: boolean = false) {
    const input = readFile(__filename, isTest);

    const [cratesLines, moves] = input.replaceAll("\r", "").split("\n\n");

    const crates: Array<Array<string>> = [];

    for (const line of cratesLines.split("\n")) {
        if (line.includes("1")) continue;
        for (let i = 0; i < line.length - 1; i += 4) {
            const letter = line.slice(i, i + 4)?.[1]?.trim();
            if (letter == "") continue;
            if (!crates[i / 4]?.length) crates[i / 4] = [];
            crates[i / 4].unshift(letter);
        }
    }

    const regex = new RegExp(`move (?<move>[0-9]*) from (?<from>[0-9]*) to (?<to>[0-9]*)`, "g");

    for (const moveLine of moves.matchAll(regex)) {
        const { move, from, to } = moveLine.groups ?? {};
        const crate = crates[parseInt(from) - 1];
        const letters = crate.splice(crate.length - parseInt(move), parseInt(move));
        crates[parseInt(to) - 1].push(...letters);
    }

    return crates.map((c) => c.pop() ?? "").join("");
}
