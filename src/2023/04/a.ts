import { readLines } from "utils";

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    const cardsValues: number[] = [];
    lines.forEach((line) => {
        const [winNumbers, cards] = line
            .split(": ")[1]
            .split(" | ")
            .map((half) =>
                half
                    .split(" ")
                    .map((n) => parseInt(n.trim()))
                    .filter((n) => !isNaN(n)),
            );

        let winningNumbers = cards.filter((n) => winNumbers.includes(n)).length;

        if (winningNumbers >= 1) {
            cardsValues.push(2 ** (winningNumbers - 1));
        }
    });

    console.log(cardsValues);
    return cardsValues.reduce((a, b) => a + b, 0);
}
