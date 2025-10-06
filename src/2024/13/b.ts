import { readFile } from "utils";

const TOKEN_A_VALUE = 3;
const TOKEN_B_VALUE = 1;

export function solve(isTest: boolean = false) {
    const prizes = readFile(import.meta.filename, isTest).replaceAll("\r", "").split("\n\n");

    let tokens = 0;

    for (const prizeStr of prizes) {
        const [a, b, prize] = prizeStr.split("\n");
        const buttonA = getXYButton(a);
        const buttonB = getXYButton(b);
        const prizeXY = getXYPrize(prize);

        let result = getButtonPressCount(buttonA, buttonB, prizeXY);
        if (result) {
            tokens += result.countA * TOKEN_A_VALUE + result.countB * TOKEN_B_VALUE;
        }
    }
    return tokens;
}

function getButtonPressCount(
    buttonA: { x: number; y: number },
    buttonB: { x: number; y: number },
    prize: { x: number; y: number },
) {
    const d = buttonA.x * buttonB.y - buttonA.y * buttonB.x;
    if (d === 0) return null;

    const countA = (prize.x * buttonB.y - prize.y * buttonB.x) / d;
    const countB = (buttonA.x * prize.y - buttonA.y * prize.x) / d;

    if (countA >= 0 && countB >= 0 && Number.isInteger(countA) && Number.isInteger(countB)) {
        return { countA, countB };
    }

    return null;
}

function getXYButton(button: string) {
    const [xStr, yStr] = button.split(", ");
    const x = parseInt(xStr.split("+")[1]);
    const y = parseInt(yStr.split("+")[1]);
    return { x, y };
}

function getXYPrize(prize: string) {
    const [xStr, yStr] = prize.split(", ");
    const x = parseInt(xStr.split("=")[1]) + 10_000_000_000_000;
    const y = parseInt(yStr.split("=")[1]) + 10_000_000_000_000;
    return { x, y };
}
