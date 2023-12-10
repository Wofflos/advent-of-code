import { readLines } from "@utils/ts-utils";
import { toNumber } from "@utils/ts-math";

export function solve(isTest: boolean = false) {
    const [timesLine, distancesLine] = readLines(__filename, isTest);
    const raceTime = getNumbers(timesLine);
    const recordDistance = getNumbers(distancesLine);

    let posibilities = 0;

    for (let speed = 1; speed <= raceTime - 1; speed++) {
        const distance = speed * (raceTime - speed);
        if (distance > recordDistance) {
            posibilities++;
        } else if (posibilities > 0) {
            break;
        }
    }

    return posibilities;
}

function getNumbers(line: string) {
    return toNumber(line?.match(/\d+/g)?.filter(Boolean).join("") ?? "");
}
