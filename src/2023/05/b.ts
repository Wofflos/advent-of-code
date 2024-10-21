import { readFile } from "utils";

type Seed = {
    seedStart: number;
    seedRange: number;
};

export function solve(isTest: boolean = false) {
    const input = readFile(import.meta.filename, isTest);
    const [seedsLine, ...maps] = input.replaceAll("\r", "").split("\n\n");
    const seeds = seedsLine.split(": ")[1].split(" ").map(toNumber);
    const realSeeds: Seed[] = [];
    for (let i = 0; i < seeds.length; i = i + 2) {
        realSeeds.push({ seedStart: seeds[i], seedRange: seeds[i + 1] });
    }
    console.log(realSeeds);

    for (const map of maps) {
        const lines = map
            .split("\n")
            .slice(1)
            .map((line) => line.split(" ").map(toNumber));

        realSeeds.forEach((seed) => {
            processSeed(realSeeds, seed, lines);
        });
    }

    console.log(realSeeds);

    return realSeeds
        .map((s) => s.seedStart)
        .sort((a, b) => a - b)
        .shift();
}

function processSeed(seedList: Seed[], seed: Seed, lines: number[][]) {
    let index = 0;
    for (const [destination, source, range] of lines) {
        if (seed.seedStart >= source && seed.seedStart <= source + range - 1) {
            if (seed.seedStart + seed.seedRange - 1 > source + range - 1) {
                let diff = seed.seedStart + seed.seedRange - 1 - (source + range - 1);
                seed.seedRange = seed.seedRange - diff;

                seedList.push({ seedStart: seed.seedStart + seed.seedRange, seedRange: diff });
                processSeed(seedList, seedList[seedList.length - 1], lines);
            }
            seed.seedStart = destination + (seed.seedStart - source);
            break;
        }
        index++;
    }
}

function toNumber(s: string) {
    return parseInt(s.trim());
}
