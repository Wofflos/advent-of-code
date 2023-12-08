import { readLines } from "@utils/ts-utils";

type Node = {
    id: string;
    L?: Node | null;
    R?: Node | null;
};

export function solve(isTest: boolean = false) {
    const lines = readLines(__filename, isTest);
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

    let steps = 0;
    let found = false;
    let actualNode: Node | null = nodesAux["AAA"];

    while (!found && actualNode != null) {
        for (const move of sequence.split("")) {
            actualNode = (actualNode != null ? actualNode[move as "L" | "R"] ?? null : null) as Node | null;

            if (actualNode == null) {
                break;
            }

            steps++;

            if (actualNode.id === "ZZZ") {
                found = true;
                break;
            }
        }
    }

    return steps;
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
