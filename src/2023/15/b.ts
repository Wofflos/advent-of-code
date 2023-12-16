import { readLines } from "@utils/ts-utils";
import { toNumber } from "@utils/ts-math";

type Lens = {
    label: string;
    focalLength: number;
};

type Box = {
    lenses: Lens[];
};

export function solve(isTest: boolean = false) {
    const sequences = readLines(__filename, isTest)[0].split(",");

    const boxes: Box[] = [];

    for (const sequence of sequences) {
        const match = sequence.match(/(?<label>[a-zA-Z]+)(?<separator>[-=])(?<value>\d+)?/)?.groups;
        if (!match) continue;
        const { label, separator, value } = match;
        const lens: number = toNumber(value);
        const hashValue = hash(label);

        const box = boxes[hashValue] ?? (boxes[hashValue] = { lenses: [] });

        let index = box.lenses.findIndex((l) => l.label === label);
        if (separator === "-") {
            if (index != -1) {
                box.lenses.splice(index, 1);
            }
        } else if (separator === "=") {
            if (index != -1) {
                box.lenses[index].focalLength = lens;
            } else {
                box.lenses.push({ label, focalLength: lens });
            }
        }
    }

    return boxes
        .map((box, indexBox) => box.lenses.map((l, index) => (indexBox + 1) * l.focalLength * (index + 1)))
        .flat()
        .reduce((a, b) => a + b, 0);
}

function hash(s: string) {
    let value = 0;
    for (const c of s) {
        value = ((c.charCodeAt(0) + value) * 17) % 256;
    }
    return value;
}
