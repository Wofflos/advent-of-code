import { toNumber } from "@utils/ts-math";
import { readLines } from "@utils/ts-utils";

type SpringGroup = {
    springs: string[];
    damagedGroups: number[];
};

export function solve(isTest: boolean = false) {
    const lines = readLines(__filename, isTest);

    const configs: SpringGroup[] = lines.map((line) => {
        const [springs, damagedGroups] = line.split(" ");
        const sp = springs.split("");
        const unknownGroups: number[] = [];
        let index = 0;

        for (const spring of sp) {
            if (spring === "?") {
                unknownGroups[index] = 1 + (unknownGroups[index] ?? 0);
            } else {
                index++;
            }
        }

        return {
            springs: sp,
            damagedGroups: damagedGroups.split(",").map((size) => toNumber(size)),
        };
    });

    let combinations = 0;

    for (const spGroup of configs) {
        combinations += getCombinations(spGroup.springs, spGroup.damagedGroups);
    }

    return combinations;
}

/**
 * https://www.youtube.com/watch?v=g3Ms5e7Jdqo
 */
function getCombinations(springs: string[], damagedGroups: number[]) {
    let combinations = 0;
    if (springs.length === 0) {
        return damagedGroups.length ? 0 : 1;
    }

    if (damagedGroups.length === 0) {
        return springs.includes("#") ? 0 : 1;
    }

    if (springs[0] === "." || springs[0] === "?") {
        combinations += getCombinations(springs.slice(1), damagedGroups);
    }

    if (springs[0] === "#" || springs[0] === "?") {
        if (
            damagedGroups[0] <= springs.length &&
            springs.slice(0, damagedGroups[0]).every((s) => s !== ".") &&
            (damagedGroups[0] === springs.length || springs[damagedGroups[0]] !== "#")
        ) {
            combinations += getCombinations(springs.slice(damagedGroups[0] + 1), damagedGroups.slice(1));
        }
    }

    return combinations;
}
