import { toNumber } from "utils/math";
import { readFile } from "utils";

type Part = {
    x: number;
    m: number;
    a: number;
    s: number;
};

type WorkFlow = {
    id: string;
    conditions: Array<Condition>;
};

type Condition = {
    operator: string | null;
    prop: "x" | "m" | "a" | "s" | null;
    value: number;
    result: string;
};

export function solve(isTest: boolean = false) {
    const [wfs, partsStr] = readFile(import.meta.filename, isTest).replaceAll("\r", "").split("\n\n");
    const parts: Part[] = [];
    const workflows: Map<string, WorkFlow> = new Map();

    partsStr
        .replaceAll("{", "")
        .replaceAll("}", "")
        .split("\n")
        .forEach((p) => {
            const rating: Part = { x: 0, m: 0, a: 0, s: 0 };
            p.split(",").forEach((ratings) => {
                const aux = ratings.split("=");
                rating[aux[0] as "x" | "m" | "a" | "s"] = toNumber(aux[1]);
            });

            parts.push(rating);
        });

    for (const wf of wfs.split("\n")) {
        const [id, conditions] = wf.replace("}", "").split("{");
        const workFlow: WorkFlow = { id: id, conditions: [] };
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
        workflows.set(workFlow.id, workFlow);
    }

    let accepted = 0;

    for (const part of parts) {
        let workflow: WorkFlow | null = workflows.get("in") ?? null;
        if (!workflow) {
            continue;
        }
        while (workflow) {
            for (const condition of workflow.conditions) {
                let conditionMet = !condition.operator || !condition.prop;

                if (!conditionMet && condition.operator && condition.prop) {
                    if (condition.operator === ">") {
                        conditionMet ||= part[condition.prop] > condition.value;
                    } else if (condition.operator === "<") {
                        conditionMet ||= part[condition.prop] < condition.value;
                    }
                }

                if (!conditionMet) {
                    continue;
                }

                if (condition.result === "A") {
                    accepted += part.a + part.m + part.s + part.x;
                    workflow = null;
                    break;
                } else if (condition.result === "R") {
                    workflow = null;
                    break;
                } else {
                    workflow = workflows.get(condition.result) ?? null;
                    break;
                }
            }
        }
    }

    return accepted;
}
