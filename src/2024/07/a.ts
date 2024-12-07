import { readLines } from "utils";
import { toNumber } from "utils/math";

type Equation = {
    result: number;
    operands: number[];
};

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    const equations: Equation[] = lines.map((l) => {
        const [result, nums] = l.split(":");
        return {
            result: toNumber(result),
            operands: nums.trim().split(" ").map(toNumber),
        };
    });

    let result = 0;

    for (const equation of equations) {
        if (isEquationCorrect(equation)) {
            result += equation.result;
        }
    }

    return result;
}

function isEquationCorrect(equation: Equation): boolean {
    let cycle = 0;
    while (true) {
        let calc = equation.operands[0];
        let operators = cycle.toString(2).split("");
        while (operators.length < (equation.operands.length - 1)) {
            operators.unshift("0");
        }

        if (operators.length > (equation.operands.length - 1)) {
            break;
        }

        for (let index = 1; index < equation.operands.length; index++) {
            const element = equation.operands[index];
            if (operators?.[index - 1] == "1") {
                calc = (calc ?? 1) * element;
            } else {
                calc = (calc ?? 0) + element;
            }
        }

        if (calc === equation.result) {
            return true;
        }

        cycle++;
    }

    return false;
}
