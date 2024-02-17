import { toNumber } from "@utils/ts-math";
import { readLines } from "@utils/ts-utils";
import { Heapq } from "ts-heapq";

type Point = {
    row: number;
    column: number;
};

type Position = {
    position: Point;
    direction: Point;
    steps: number;
    heatloss: number;
};

export function solve(isTest: boolean = false) {
    const blocks: string[][] = readLines(__filename, isTest).map((l) => l.trim().split(""));
    const seen: Set<string> = new Set();

    let states: Heapq<Position> = new Heapq<Position>(
        [{ position: { row: 0, column: 0 }, direction: { row: 0, column: 0 }, steps: 0, heatloss: 0 }],
        (a, b) => a.heatloss < b.heatloss,
    );
    const end: Point = { row: blocks.length - 1, column: blocks[0].length - 1 };

    // https://es.wikipedia.org/wiki/Algoritmo_de_Dijkstra
    while (states.length() > 0) {
        let state: Position | undefined = states.pop();
        if (!state) break;

        if (state.position.row === end.row && state.position.column === end.column) {
            return state.heatloss;
        }

        let positionString = positionToString(state);
        if (seen.has(positionString)) {
            continue;
        }

        seen.add(positionString);

        for (const direction of [
            { row: 0, column: 1 },
            { row: 0, column: -1 },
            { row: 1, column: 0 },
            { row: -1, column: 0 },
        ]) {
            let sameDirection = equals(direction, state.direction);
            // Skip if more than 3 steps in the same direction
            if (sameDirection && state.steps >= 3) continue;

            // Skip if the direction is the opposite of the current direction
            if (equals(direction, { row: -state.direction.row, column: -state.direction.column })) continue;

            // Next position
            let next = { row: state.position.row + direction.row, column: state.position.column + direction.column };

            // Next position is within bounds
            if (next.row >= 0 && next.row < blocks.length && next.column >= 0 && next.column < blocks[0].length) {
                states.push({
                    position: next,
                    direction: direction,
                    steps: sameDirection ? state.steps + 1 : 1,
                    heatloss: state.heatloss + toNumber(blocks[next.row][next.column]),
                });
            }
        }
    }

    return 0;
}

function positionToString(p: Position) {
    return `${p.position.row},${p.position.column}|${p.direction.row},${p.direction.column}|${p.steps}`;
}

function equals(d1: Point, d2: Point) {
    return d1.row === d2.row && d1.column === d2.column;
}
