import { readLines } from "utils";

type Vector2D = { x: number; y: number };

type Robot = {
    initialPosition: Vector2D;
    position: Vector2D;
    velocity: Vector2D;
};

const WIDTH = 101;
const HEIGHT = 103;
const SECONDS = 10000;
// 6870

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);
    const robots: Robot[] = [];
    for (const line of lines) {
        //pos="p=x,y" vel="v=x,y"
        const [pos, vel] = line.split(" ");

        const initialPosition = parseVector2D(pos.split("=")[1]);
        const velocity = parseVector2D(vel.split("=")[1]);
        robots.push({
            initialPosition,
            position: { ...initialPosition },
            velocity,
        });
    }
    const middleWidth = Math.floor(WIDTH / 2);
    const middleHeight = Math.floor(HEIGHT / 2);
    let lowerSaf = Infinity;
    let bestSecond = -1;

    for (let second = 0; second < SECONDS; second++) {
        const cuadrantCounts = [0, 0, 0, 0];

        for (const robot of robots) {
            robot.position.x += robot.velocity.x;
            robot.position.y += robot.velocity.y;

            robot.position.x = ((robot.position.x % WIDTH) + WIDTH) % WIDTH;
            robot.position.y = ((robot.position.y % HEIGHT) + HEIGHT) % HEIGHT;

            if (robot.position.x === middleWidth || robot.position.y === middleHeight) {
                continue;
            }

            if (robot.position.x < middleWidth && robot.position.y < middleHeight) {
                cuadrantCounts[0]++;
            } else if (robot.position.x > middleWidth && robot.position.y < middleHeight) {
                cuadrantCounts[1]++;
            } else if (robot.position.x < middleWidth && robot.position.y > middleHeight) {
                cuadrantCounts[2]++;
            } else if (robot.position.x > middleWidth && robot.position.y > middleHeight) {
                cuadrantCounts[3]++;
            }
        }

        const saf = cuadrantCounts.reduce((a, b) => a * b, 1);
        if (saf < lowerSaf) {
            lowerSaf = saf;
            bestSecond = second + 1;
        }
    }

    // const grid = Array.from({ length: WIDTH }, () => Array.from({ length: HEIGHT }, () => 0));
    // for (const robot of robots) {
    //     grid[robot.position.x][robot.position.y]++;
    // }

    // console.log("Grid state after simulation:");
    // for (let y = 0; y < HEIGHT; y++) {
    //    let row = "";
    //    for (let x = 0; x < WIDTH; x++) {
    //        row += grid[x][y] > 0 ? "#" : ".";
    //    }
    //    console.log(row);
    // }
    // console.log("\n");

    return JSON.stringify({ bestSecond, lowerSaf });
}

/**
 * @param input String in the format "x,y"
 */
function parseVector2D(input: string): Vector2D {
    const [x, y] = input.split(",").map(Number);
    return { x, y };
}
