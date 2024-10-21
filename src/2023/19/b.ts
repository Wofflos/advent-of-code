import { toNumber } from "utils/math";
import { readFile } from "utils";

type Part = {
    x: Range;
    m: Range;
    a: Range;
    s: Range;
};

type Range = {
    min: number;
    max: number;
};

type WorkFlow = {
    id: string;
    conditions: Array<Condition>;
    result: string;
};

type Condition = {
    operator: string | null;
    prop: "x" | "m" | "a" | "s" | null;
    value: number;
    result: string;
};

const workflows: Map<string, WorkFlow> = new Map();

export function solve(isTest: boolean = false) {
    const [wfs, _] = readFile(import.meta.filename, isTest).replaceAll("\r", "").split("\n\n");

    for (const wf of wfs.split("\n")) {
        const [id, conditions] = wf.replace("}", "").split("{");
        const workFlow: WorkFlow = { id: id, conditions: [], result: "" };
        conditions.split(",").forEach((c) => {
            const condition: Condition = { operator: null, prop: null, value: 0, result: "" };
            if (!c.includes(":")) {
                condition.result = c;
            } else {
                let [cond, result] = c.split(":");
                condition.result = result;
                condition.prop = cond[0] as "x" | "m" | "a" | "s" | null;
                cond = cond.substring(1);
                condition.operator = cond[0];
                cond = cond.substring(1);
                condition.value = toNumber(cond);
            }
            workFlow.conditions.push(condition);
        });
        workFlow.result = workFlow.conditions.pop()?.result ?? "R";
        workflows.set(workFlow.id, workFlow);
    }

    const part = {
        x: { min: 1, max: 4000 },
        m: { min: 1, max: 4000 },
        a: { min: 1, max: 4000 },
        s: { min: 1, max: 4000 },
    };

    return countPossibilities(part);
}

function countPossibilities(part: Part, workFlowName: string = "in") {
    if (workFlowName === "R") {
        return 0;
    }

    if (workFlowName === "A") {
        let value = 1;
        for (const key of Object.keys(part)) {
            const r = part[key as keyof Part];
            value *= r.max - r.min + 1;
        }

        return value;
    }

    const workflow: WorkFlow | null = workflows.get(workFlowName) ?? null;

    if (!workflow) {
        return 0;
    }

    let total = 0;

    for (const condition of workflow.conditions) {
        const prop: Range = part[condition.prop as keyof Part];
        let cTrue: Range = { min: 0, max: 0 };
        let cFalse: Range = { min: 0, max: 0 };

        if (condition.operator === "<") {
            cTrue = { min: prop.min, max: Math.min(prop.max, condition.value - 1) };
            cFalse = { min: Math.max(prop.min, condition.value), max: prop.max };
        } else if (condition.operator === ">") {
            cTrue = { min: Math.max(prop.min, condition.value + 1), max: prop.max };
            cFalse = { min: prop.min, max: Math.min(prop.max, condition.value) };
        }

        if (cTrue.min <= cTrue.max) {
            const copy = copyPart(part);
            copy[condition.prop as keyof Part] = cTrue;
            total += countPossibilities(copy, condition.result);
        }

        if (cFalse.min <= cFalse.max) {
            part = copyPart(part);
            part[condition.prop as keyof Part] = cFalse;
        } else {
            break;
        }
    }

    total += countPossibilities(part, workflow.result);

    return total;
}

function copyPart(part: Part) {
    return {
        x: { min: part.x.min, max: part.x.max },
        m: { min: part.m.min, max: part.m.max },
        a: { min: part.a.min, max: part.a.max },
        s: { min: part.s.min, max: part.s.max },
    };
}
