import { readFile } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    let stones = readFile(import.meta.filename, isTest).split(" ").map(toNumber);

    let blinks = 25;

    while (blinks > 0) {
        for (let index = 0; index < stones.length; index++) {
            const stone = stones[index];
            let s = stone.toString();
            if (stone === 0) {
                stones[index] = 1;
            } else if (s.length % 2 === 0) {
                stones.splice(
                    index,
                    1,
                    toNumber(s.substring(0, s.length / 2)),
                    toNumber(s.substring(s.length / 2)),
                );
                index++;
            } else {
                stones[index] *= 2024;
            }
        }
        blinks--;
    }

    return stones.length;
}
