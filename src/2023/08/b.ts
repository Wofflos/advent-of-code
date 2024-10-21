import { readLines } from "utils";
import { findLCM } from "utils/math";

type Node = {
    id: string;
    L?: Node | null;
    R?: Node | null;
};

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);
    const sequence = lines[0];

    let nodesAux: { [key: string]: Node } = {};

    lines.splice(2).forEach((line) => {
        const regex = /^(?<id>\w+) = \((?<left>\w+), (?<rigth>\w+)\)$/;
        const { id, left, rigth } = regex.exec(line)?.groups ?? {};
        const node = getOrCreateNode(id, nodesAux);

        if (left != id && node.L == null) {
            node.L = getOrCreateNode(left, nodesAux);
        }

        if (rigth != id && node.R == null) {
            node.R = getOrCreateNode(rigth, nodesAux);
        }
    });

    let nodes: Node[] = Object.values(nodesAux).filter((node) => {
        return node.id[2] === "A";
    });

    let steps: number[] = Array(nodes.length).fill(0);

    nodes.forEach((node, index) => {
        let found = false;
        while (!found) {
            for (const move of sequence.split("")) {
                if (node == null) {
                    break;
                }

                let nextMove: Node | null = null;

                if (nodes[index] != null) {
                    nextMove = nodes[index][move as "L" | "R"] ?? null;
                }

                if (nextMove == null) {
                    break;
                }

                nodes[index] = nextMove;
                steps[index]++;
                if (nextMove.id[2] === "Z") {
                    found = true;
                    break;
                }
            }
        }
    });

    return findLCM(steps);
}

function getOrCreateNode(id: string, nodesAux: { [key: string]: Node }): Node {
    if (nodesAux[id]) {
        return nodesAux[id];
    } else {
        const node = { id };
        nodesAux[id] = node;
        return node;
    }
}
