import { readLines } from "utils";

type Vector2D = {x: number, y: number};

type Robot = {
    initialPosition: Vector2D;
    position: Vector2D;
    velocity: Vector2D;
}

const WIDTH=101;
const HEIGHT=103;
const SECONDS=100;

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
            position: {...initialPosition},
            velocity
        });
    }
    const middleWidth = Math.floor(WIDTH / 2);
    const middleHeight = Math.floor(HEIGHT / 2);
    const cuadrantCounts = [0, 0, 0, 0];

    for (const robot of robots) {
        for (let second = 0; second < SECONDS; second++) {
            robot.position.x += robot.velocity.x;
            robot.position.y += robot.velocity.y;
            
            robot.position.x = ((robot.position.x % WIDTH) + WIDTH) % WIDTH;
            robot.position.y = ((robot.position.y % HEIGHT) + HEIGHT) % HEIGHT;
        }

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

    return cuadrantCounts.reduce((a, b) => a * b, 1);
}


/**
 * @param input String in the format "x,y"
 */
function parseVector2D(input: string): Vector2D {
    const [x, y] = input.split(",").map(Number);
    return {x, y};
}
