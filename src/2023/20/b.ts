import { readLines } from "utils";
import { findLCM } from "utils/math";

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

    const output = "rx";
    const sender = modules.values().find((m) =>
        m.destinations.some((d) => d.id === output)
    )?.id;

    if (!sender) {
        return 0;
    }

    const senders: Map<string, number> = new Map(
        modules.values().filter((m) =>
            m.destinations.some((d) => d.id === sender)
        ).map((m) => [m.id, 0]),
    );

    const queue: Pulse[] = [];

    let loop = 1;
    while (true) {
        modules.get("broadcaster")?.destinations.forEach((d) => {
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

                    if (pulseValue && senders.has(module.id)) {
                        senders.set(module.id, loop);
                    }

                    break;
                default:
                    break;
            }

            if (pulseValue !== null) {
                module.destinations.forEach((d) => {
                    queue.push({
                        sender: module.id,
                        target: d.id,
                        value: pulseValue,
                    });
                });
            }

            if (!senders.values().some((v) => v === 0)) {
                console.log(senders);
                return findLCM(Array.from(senders.values()));
            }
        }

        loop++;
    }
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
