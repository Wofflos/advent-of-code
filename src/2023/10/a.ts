import { readLines } from "@utils/ts-utils";

//TODO refactor?????
const pipes: { [key: string]: Array<Array<number>> } = {
    "|": [
        [-1, 0],
        [1, 0],
    ],
    "-": [
        [0, -1],
        [0, 1],
    ],
    L: [
        [-1, 0],
        [0, 1],
    ],
    J: [
        [-1, 0],
        [0, -1],
    ],
    "7": [
        [0, -1],
        [1, 0],
    ],
    F: [
        [0, 1],
        [1, 0],
    ],
};

export function solve(isTest: boolean = false) {
    const lines = readLines(__filename, isTest);
    const loop: Array<Array<number>> = [];
    const matrix: Array<Array<string>> = lines.map((line) => line.split(""));

    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        const index = row.indexOf("S");
        if (index > -1) {
            loop.push([i, index]);
            break;
        }
    }

    let completedLoop = false;
    const [xStart, yStart] = loop[0];
    let [xPipe, yPipe, ncX, ncY] = getNextPipe(xStart, yStart, matrix);

    if (xPipe == null || yPipe == null || ncX == null || ncY == null) {
        return 0;
    }

    while (!completedLoop) {
        loop.push([xPipe, yPipe]);

        xPipe = xPipe + (ncX ?? 0);
        yPipe = yPipe + (ncY ?? 0);

        const pipe: string = matrix[xPipe][yPipe];
        const pipeConnections: Array<Array<number>> = pipes[pipe];
        if (pipe === "S") {
            completedLoop = true;
            break;
        }

        for (const c of [0, 1]) {
            const connection = pipeConnections[c];
            const [xc, yc] = connection;
            if (ncX + xc === 0 && ncY + yc === 0) {
                [ncX, ncY] = pipeConnections[c === 0 ? 1 : 0];
                break;
            }
        }
    }

    return loop.length / 2;
}

//TODO refactor?????
function getNextPipe(x: number, y: number, matrix: Array<Array<string>>) {
    for (const row of [x - 1, x, x + 1]) {
        for (const col of [y - 1, y, y + 1]) {
            if (
                row < 0 ||
                col < 0 ||
                row >= matrix.length ||
                col >= matrix[0].length ||
                (row === x && col === y) ||
                matrix[row][col] === "."
            ) {
                continue;
            }

            const pipe = matrix[row][col];
            const pipeConnections = pipes[pipe];

            if (!pipeConnections) {
                break;
            }

            for (const c of [0, 1]) {
                const connection = pipeConnections[c];
                const [xDir, yDir] = connection;
                if (row + xDir === x && col + yDir === y) {
                    return [row, col, ...pipeConnections[c === 0 ? 1 : 0]];
                }
            }
        }
    }

    return [null, null];
}
