import { readFile } from "@utils/ts-utils";

export function solve(isTest: boolean = false) {
    const input = readFile(__filename, isTest);
    const [seedsLine, ...maps] = input.replaceAll("\r", "").split("\n\n");
    const seeds = seedsLine.split(": ")[1].split(" ").map(toNumber);

    for (const map of maps) {
        const lines = map
            .split("\n")
            .slice(1)
            .map((line) => line.split(" ").map(toNumber));

        seeds.forEach((seed, index) => {
            for (const [destination, source, range] of lines) {
                if (seed >= source && seed <= source + range) {
                    seeds[index] = destination + (seed - source);
                    break;
                }
            }
        });
    }

    return seeds.sort((a, b) => a - b).shift();
}

function toNumber(s: string) {
    return parseInt(s.trim());
}
