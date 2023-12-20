import { readLines } from "@utils/ts-utils";

type Point = {
    x: number;
    y: number;
};

type Movement = {
    position: Point;
    direction: Point;
};

export function solve(isTest: boolean = false) {
    const layout = readLines(__filename, isTest).map((l) => l.trim().split(""));

    const energizedTiles = new Set<string>();
    const movements = new Set<string>();
    let moves: Movement[] = [{ position: { x: 0, y: 0 }, direction: { x: 0, y: 1 } }];
    let cantMovs = 1;

    while (cantMovs > 0) {
        if (moves) {
            moves.forEach((m) => energizedTiles.add(`${m.position.x},${m.position.y}`));
            moves = moves.flatMap((m) => moveBeam(layout, m.position, m.direction, movements));
        }

        cantMovs = moves?.length ?? 0;
    }

    return energizedTiles.size;
}

function moveBeam(layout: string[][], position: Point, direction: Point, movements: Set<string>) {
    const newPosition: Point = {
        x: position.x + direction.x,
        y: position.y + direction.y,
    };

    if (newPosition.x < 0 || newPosition.x >= layout.length || newPosition.y < 0 || newPosition.y >= layout[0].length) {
        return [];
    }

    if (movements.has(`${newPosition.x},${newPosition.y}|${direction.x},${direction.y}`)) {
        return [];
    } else {
        movements.add(`${newPosition.x},${newPosition.y}|${direction.x},${direction.y}`);
    }

    const newTile = layout[newPosition.x][newPosition.y];

    switch (newTile) {
        case ".":
            return [{ position: newPosition, direction }];
        case "|":
            if (direction.x === 0) {
                // If we're moving horizontally, branch out vertically
                return [
                    { position: newPosition, direction: { x: -1, y: 0 } },
                    { position: newPosition, direction: { x: 1, y: 0 } },
                ];
            } else {
                // If we're moving vertically, keep going
                return [{ position: newPosition, direction }];
            }
        case "-":
            if (direction.y === 0) {
                // If we're moving vertically, branch out horizontally
                return [
                    { position: newPosition, direction: { x: 0, y: -1 } },
                    { position: newPosition, direction: { x: 0, y: 1 } },
                ];
            } else {
                // If we're moving horizontally, keep going
                return [{ position: newPosition, direction }];
            }
        case "/":
            if (direction.x === -1) {
                //If we're moving up, go right
                return [{ position: newPosition, direction: { x: 0, y: 1 } }];
            } else if (direction.x === 1) {
                //If we're moving down, go left
                return [{ position: newPosition, direction: { x: 0, y: -1 } }];
            } else if (direction.y === -1) {
                //If we're moving left, go down
                return [{ position: newPosition, direction: { x: 1, y: 0 } }];
            } else if (direction.y === 1) {
                //If we're moving right, go up
                return [{ position: newPosition, direction: { x: -1, y: 0 } }];
            }
        case "\\":
            if (direction.x === -1) {
                //If we're moving up, go left
                return [{ position: newPosition, direction: { x: 0, y: -1 } }];
            } else if (direction.x === 1) {
                //If we're moving down, go right
                return [{ position: newPosition, direction: { x: 0, y: 1 } }];
            } else if (direction.y === -1) {
                //If we're moving left, go up
                return [{ position: newPosition, direction: { x: -1, y: 0 } }];
            } else if (direction.y === 1) {
                //If we're moving right, go down
                return [{ position: newPosition, direction: { x: 1, y: 0 } }];
            }
    }

    return [];
}
