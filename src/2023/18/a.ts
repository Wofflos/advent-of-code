import { getArea, getPointsInArea, toNumber } from "@utils/ts-math";
import { readLines } from "@utils/ts-utils";

type Direction = "R" | "D" | "L" | "U";
type DigPlan = {
    direction: number[];
    color: string;
    count: number;
};

export function solve(isTest: boolean = false) {
    const loop: Array<Array<number>> = [[0, 0]];
    let points = 0;

    readLines(__filename, isTest).forEach((l) => {
        let [letter, c, color] = l.trim().split(" ");

        color = color.replace("(", "").replace(")", "");
        letter = letter as Direction;

        let direction = [0, 0];
        switch (letter) {
            case "R":
                direction = [0, 1];
                break;
            case "D":
                direction = [1, 0];
                break;
            case "L":
                direction = [0, -1];
                break;
            case "U":
                direction = [-1, 0];
                break;
        }

        let count = toNumber(c);
        points += count;
        const lastPosition = loop[loop.length - 1];
        loop.push([lastPosition[0] + direction[0] * count, lastPosition[1] + direction[1] * count]);
        loop.push([lastPosition[0] + direction[0] * count, lastPosition[1] + direction[1] * count]);
    });

    loop.pop();

    //Pick's theorem to calculate the points inside the area + outer layer of points
    return points + (getArea(loop) - points / 2 + 1);
}
