import { validateArgs } from "@utils/ts-utils";
import { exit } from "process";

async function importFile() {
    const { year, leftPaddedDay, namedArgs } = validateArgs();
    const part = namedArgs["b"] ? "b" : "a";
    const src = `../src/${year}/${leftPaddedDay}/${part}`;
    const isTest = namedArgs["test"] ?? false;

    try {
        console.log(`Solving ${leftPaddedDay}-${year} Part ${part.toUpperCase()} ╰(*°▽°*)╯ 🎄`);
        const { solve } = await import(src);
        console.time("\nTime to solve");
        console.log(
            `Result for ${leftPaddedDay}-${year} ${isTest ? "test" : ""} Part ${part.toUpperCase()} is: ${solve(
                isTest,
            )}`,
        );
        console.timeEnd("\nTime to solve");
    } catch (error) {
        console.log(`Error solving part ${part.toUpperCase()} 😿`);
        console.log(error);
        exit(0);
    }
}

importFile();
