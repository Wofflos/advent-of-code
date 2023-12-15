import { readLines } from "@utils/ts-utils";

//top, left, bottom, right
//north, west, south, east

export function solve(isTest: boolean = false) {
    const panel = readLines(__filename, isTest).map((line) => line.split(""));
    const directions = ["north", "west", "south", "east"] as const;
    let MAX = 1_000_000_000;

    const history: string[] = [];

    let i = 0;
    let loopStart = -1;
    while (i <= MAX) {
        cycle(panel);
        i++;
        const panelString = panel.map((element) => element.join("")).join("");
        loopStart = history.indexOf(panelString);
        history[i] = panelString;

        if (loopStart !== -1) {
            break;
        }
    }

    const loopLength = i - loopStart;

    while (MAX % loopLength !== i % loopLength) {
        cycle(panel);
        i++;
    }

    return calculateLoad(panel);
}

function cycle(panel: string[][]) {
    const directions = ["north", "west", "south", "east"] as const;
    for (const direction of directions) {
        tilt(panel, direction);
    }
}

function calculateLoad(panel: string[][]) {
    let load = 0;
    for (let row = 0; row < panel.length; row++) {
        for (let col = 0; col < panel[row].length; col++) {
            if (panel[row][col] === "O") {
                load += panel.length - row;
            }
        }
    }
    return load;
}

function tilt(panel: string[][], direction: "north" | "west" | "south" | "east") {
    switch (direction) {
        case "north":
            tiltNorth(panel);
            break;
        case "west":
            tiltWest(panel);
            break;
        case "south":
            tiltSouth(panel);
            break;
        case "east":
            tiltEast(panel);
            break;
    }
}

function tiltNorth(panel: string[][]) {
    for (let row = 0; row < panel.length; row++) {
        for (let col = 0; col < panel[row].length; col++) {
            if (panel[row][col] === "O") {
                panel[row][col] = ".";
                let newRow = row;
                while (newRow > 0 && panel[newRow - 1][col] === ".") {
                    newRow--;
                }
                panel[newRow][col] = "O";
            }
        }
    }
}

function tiltWest(panel: string[][]) {
    for (let row = 0; row < panel.length; row++) {
        for (let col = 0; col < panel[row].length; col++) {
            if (panel[row][col] === "O") {
                panel[row][col] = ".";
                let newCol = col;
                while (newCol > 0 && panel[row][newCol - 1] === ".") {
                    newCol--;
                }
                panel[row][newCol] = "O";
            }
        }
    }
}

function tiltSouth(panel: string[][]) {
    for (let row = panel.length - 1; row >= 0; row--) {
        for (let col = 0; col < panel[row].length; col++) {
            if (panel[row][col] === "O") {
                panel[row][col] = ".";
                let newRow = row;
                while (newRow < panel.length - 1 && panel[newRow + 1][col] === ".") {
                    newRow++;
                }
                panel[newRow][col] = "O";
            }
        }
    }
}

function tiltEast(panel: string[][]) {
    for (let row = 0; row < panel.length; row++) {
        for (let col = panel[row].length - 1; col >= 0; col--) {
            if (panel[row][col] === "O") {
                panel[row][col] = ".";
                let newCol = col;
                while (newCol < panel[row].length - 1 && panel[row][newCol + 1] === ".") {
                    newCol++;
                }
                panel[row][newCol] = "O";
            }
        }
    }
}
