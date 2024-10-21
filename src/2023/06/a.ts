import { readLines } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const [timesLine, distancesLine] = readLines(import.meta.filename, isTest);
    const times = getNumbers(timesLine);
    const distances = getNumbers(distancesLine);

    const posibleSpeeds = [];
    for (let i = 0; i < times.length; i++) {
        const raceTime = times[i];
        const recordDistance = distances[i];
        let posibilities = 0;

        for (let speed = 1; speed <= raceTime - 1; speed++) {
            const distance = speed * (raceTime - speed);
            if (distance > recordDistance) {
                posibilities++;
            }
        }
        posibleSpeeds.push(posibilities);
    }

    return posibleSpeeds.reduce((acc, curr) => acc * curr, 1);
}

function getNumbers(line: string) {
    return line?.match(/\d+/g)?.filter(Boolean).map(toNumber) ?? [];
}
