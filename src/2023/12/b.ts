import { toNumber } from "@utils/ts-math";
import { readLines } from "@utils/ts-utils";

type SpringGroup = {
    springs: string[];
    damagedGroups: number[];
};

const definedConfigs: { [key: string]: number } = {};

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

        let aux = expandArray([...sp, "?"], 5);
        aux.pop();
        return {
            springs: aux,
            damagedGroups: expandArray(
                damagedGroups.split(",").map((size) => toNumber(size)),
                5,
            ),
        };
    });

    let combinations = 0;
    for (const spGroup of configs) {
        let c = combinations;
        combinations += getCombinations(spGroup.springs, spGroup.damagedGroups);
    }

    return combinations;
}

function expandArray(arr: any[], size: number) {
    return Array(size)
        .fill("")
        .map(() => [...arr])
        .flat();
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

    const key = springs.join(",") + damagedGroups.join(",");

    if (definedConfigs.hasOwnProperty(key)) {
        return definedConfigs[key];
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

    definedConfigs[key] = combinations;
    return combinations;
}
