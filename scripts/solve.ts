import { validateArgs } from "utils";

async function importFile() {
    const { year, leftPaddedDay, part, test } = validateArgs();
    const src = `../src/${year}/${leftPaddedDay}/${part}.ts`;

    try {
        console.log(`Solving ${leftPaddedDay}-${year} Part ${part.toUpperCase()} ╰(*°▽°*)╯ 🎄`);
        const { solve } = await import(src);
        console.time("\nTime to solve");
        console.log(
            `Result for ${leftPaddedDay}-${year} ${test ? "test" : ""} Part ${part.toUpperCase()} is: ${solve(test)}`,
        );
        console.timeEnd("\nTime to solve");
    } catch (error) {
        console.log(`Error solving part ${part.toUpperCase()} 😿`);
        console.log(error);
        Deno.exit(0);
    }
}

importFile();
