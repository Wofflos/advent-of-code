import { readLines } from "utils";
import { toNumber } from "utils/math";

enum Type {
    HIGH_CARD, //all different
    ONE_PAIR,
    TWO_PAIR,
    THREE, //three same and two different
    FULL, //three same and two same
    FOUR, //four same
    FIVE, //all same
}

const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);
    const hands = lines.map((line) => {
        const [hand, bid] = line.split(" ");
        const play = {
            hand: hand.split("").map((card) => cards.indexOf(card)),
            bid: toNumber(bid),
            type: Type.HIGH_CARD,
            strHand: hand,
        };

        play.type = getTypeOfHand(play.hand);
        return play;
    });

    hands.sort((a, b) => {
        if (a.type === b.type) {
            for (let i = 0; i < 5; i++) {
                if (a.hand[i] === b.hand[i]) {
                    continue;
                }
                return a.hand[i] - b.hand[i];
            }
        }

        return a.type - b.type;
    });

    let totalWinnings = 0;

    hands.forEach((hand, index) => {
        totalWinnings += hand.bid * (index + 1);
    });

    return totalWinnings;
}

function getTypeOfHand(hand: number[]) {
    const counts = hand.reduce((acc, card) => {
        acc[card]++;
        return acc;
    }, Array(13).fill(0));

    counts.sort((a, b) => b - a);

    switch (counts[0]) {
        case 5:
            return Type.FIVE;
        case 4:
            return Type.FOUR;
        case 3:
            return counts[1] === 2 ? Type.FULL : Type.THREE;
        case 2:
            return counts[1] === 2 ? Type.TWO_PAIR : Type.ONE_PAIR;
        default:
            return Type.HIGH_CARD;
    }
}
