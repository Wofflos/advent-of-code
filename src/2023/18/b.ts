import { getArea } from "utils/math";
import { readLines } from "utils";

type Direction = "R" | "D" | "L" | "U";
type DigPlan = {
    direction: number[];
    color: string;
    count: number;
};

export function solve(isTest: boolean = false) {
    const loop: Array<Array<number>> = [[0, 0]];
    let points = 0;

    readLines(import.meta.filename, isTest).forEach((l) => {
        let [_, _1, color] = l.trim().split(" ");

        let hex: string[] = color.replace("(", "").replace(")", "").replace("#", "").split("");
        let letter = "";

        switch (hex.pop()) {
            case "0":
                letter = "R";
                break;
            case "1":
                letter = "D";
                break;
            case "2":
                letter = "L";
                break;
            case "3":
                letter = "U";
                break;
        }

        let count = parseInt(hex.join(""), 16);

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

        points += count;
        const lastPosition = loop[loop.length - 1];
        loop.push([lastPosition[0] + direction[0] * count, lastPosition[1] + direction[1] * count]);
    });

    loop.pop();

    //Pick's theorem to calculate the points inside the area + outer layer of points
    return points + (getArea(loop) - points / 2 + 1);
}
