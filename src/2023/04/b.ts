import { readLines } from "utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    const scratchCards = new Map<number, number>(); // Map<cardIndex, extraInstances>

    lines.forEach((line, index) => {
        const [winNumbers, cards] = line
            .split(": ")[1]
            .split(" | ")
            .map((half) =>
                half
                    .split(" ")
                    .map((n) => parseInt(n.trim()))
                    .filter((n) => !isNaN(n)),
            );

        let matchingNumbers = cards.filter((n) => winNumbers.includes(n)).length;
        const instances = scratchCards.get(index) ?? 0;

        if (matchingNumbers >= 1) {
            while (matchingNumbers > 0) {
                let scIndex = index + matchingNumbers;
                scratchCards.set(scIndex, (scratchCards.get(scIndex) ?? 0) + instances + 1);
                matchingNumbers--;
            }
        }
    });

    return [...scratchCards.values()].reduce((a, b) => a + b, 0) + lines.length;
}
