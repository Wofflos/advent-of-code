import { readFile } from "utils";
import { toNumber } from "utils/math";

export function solve(isTest: boolean = false) {
    const [part1, part2] = readFile(import.meta.filename, isTest)
        .replaceAll("\r", "")
        .split("\n\n");

    const rules: Map<string, string[]> = new Map();

    part1.split("\n").map((r) => {
        const [a, b] = r.split("|");
        if (rules.has(a)) {
            rules.get(a)?.push(b);
        } else {
            rules.set(a, [b]);
        }
    });

    function getValue(nums: string[]): number {
        let unordered = false;

        for (let index = 0; index < nums.length; index++) {
            const num = nums[index];
            const ordering = rules.get(num);
            if (!ordering) continue;

            for (const n of ordering) {
                let idx = nums.indexOf(n);
                if (idx == -1) continue;
                if (idx < index) {
                    nums[idx] = num;
                    nums[index] = n;
                    index = 0;
                    unordered = true;
                }
            }
        }

        if (unordered) {
            return toNumber(nums[Math.floor(nums.length / 2)]);
        } else {
            return 0;
        }
    }

    let sum = 0;
    for (const line of part2.split("\n")) {
        const nums = line.split(",");
        sum += getValue(nums);
    }

    return sum;
}
