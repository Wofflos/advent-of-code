import { readLines } from "utils";
import { toNumber } from "utils/math";

type Vector3D = {
    x: number;
    y: number;
    z: number;
};

export function solve(isTest: boolean = false) {
    const boxes: Array<Vector3D> = readLines(import.meta.filename, isTest)
        .map((l) => {
            const [x, y, z] = l.split(",").map(toNumber);
            return {
                x,
                y,
                z,
            };
        });

    const distances = [];
    for (let i = 0; i < boxes.length; i++) {
        const a = boxes[i];
        for (let j = i + 1; j < boxes.length; j++) {
            const b = boxes[j];
            let d = distance(a, b);
            distances.push({ i, j, d });
        }
    }

    distances.sort((a, b) => a.d - b.d);

    const parent = Array.from({ length: boxes.length }, (_, i) => i);
    let unionsLeft = boxes.length - 1;

    function find(a: number): number {
        if (parent[a] !== a) {
            parent[a] = find(parent[a]);
        }
        return parent[a];
    }

    function union(a: number, b: number): boolean {
        const rootA = find(a);
        const rootB = find(b);

        if (rootA === rootB) {
            return false;
        }

        parent[rootA] = rootB;
        unionsLeft--;
        return true;
    }

    for (let k = 0; k < distances.length; k++) {
        const { i, j } = distances[k];
        union(i, j);

        if (!unionsLeft) {
            return boxes[i].x * boxes[j].x;
        }
    }
}

function distance(a: Vector3D, b: Vector3D): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dz = b.z - a.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
