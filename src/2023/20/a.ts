import { readLines } from "utils";

/*
    Starts with:

    flip-flop (%) - init(false)
        true -> ignored - nothing happens
        false -> !value (flips value) and send new value

    conjuction (&) - remember type of the most recent pulse
        received from EACH of their connected input modules
        - 1° remember input in memory
        - 2° check
            if all memory is true:
                send false
            else
                send true

    broadcaster - send the pulse to all destination

    --- when button is pressed a false is send to "broadcaster"
 */
type Module = {
    id: string;
    type: string | null;
    pulse: boolean;
    destinations: Module[];
    memory: Map<string, boolean>;
};

type Pulse = {
    sender: string;
    target: string;
    value: boolean;
};

export function solve(isTest: boolean = false) {
    const lines = readLines(import.meta.filename, isTest);

    const modules: Map<string, Module> = new Map();
    for (const line of lines) {
        const [m, d] = line.split(" -> ");

        let module: Module = getOrCreateModule(
            modules,
            m.replace("%", "").replace("&", ""),
            null,
        );
        //flip-flop
        if (m.startsWith("%")) {
            module.type = "%";
        } else if (m.startsWith("&")) {
            module.type = "&";
        } else {
            module.type = m;
        }

        for (const destination of d.split(", ")) {
            module.destinations.push(
                getOrCreateModule(modules, destination, null),
            );
        }
    }

    for (const module of modules.values()) {
        if (module.type !== "&") continue;
        modules.values().filter((m) =>
            m.destinations.some((d) => d.id === module.id)
        ).forEach((m) => module.memory.set(m.id, false));
    }

    let high = 0;
    let low = 0;

    const queue: Pulse[] = [];

    let counter = 0;
    while (counter < 1000) {
        low++;
        modules.get("broadcaster")?.destinations.forEach((d) => {
            low++;
            queue.push({ sender: "broadcaster", target: d.id, value: false });
        });

        while (queue.length) {
            let pulse = queue.shift();
            if (!pulse) continue;

            let module = modules.get(pulse.target);
            if (!module) continue;

            let pulseValue: boolean | null = null;
            switch (module.type) {
                case "%":
                    if (!pulse.value) {
                        module.pulse = !module.pulse;
                        pulseValue = module.pulse;
                    }
                    break;
                case "&":
                    module.memory.set(pulse.sender, pulse.value);
                    if (!module.memory.values().some((v) => !v)) {
                        pulseValue = false;
                    } else {
                        pulseValue = true;
                    }
                    break;
                default:
                    break;
            }

            if (pulseValue !== null) {
                if (pulseValue) {
                    high += module.destinations.length;
                } else {
                    low += module.destinations.length;
                }

                module.destinations.forEach((d) => {
                    queue.push({
                        sender: module.id,
                        target: d.id,
                        value: pulseValue,
                    });
                });
            }
        }
        counter++;
    }

    console.log(high, low);
    return high * low;
}

function getOrCreateModule(
    map: Map<string, Module>,
    id: string,
    type: string | null,
): Module {
    if (!map.has(id)) {
        let module: Module = {
            id,
            type,
            pulse: false,
            destinations: [],
            memory: new Map(),
        };

        map.set(id, module);
    }

    return map.get(id) as Module;
}
