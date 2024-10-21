import { validateArgs } from "utils";

function copy() {
    const { year, leftPaddedDay } = validateArgs();
    console.log(`🎄Copying part A into B for ${leftPaddedDay}-${year} 🎄`);
    const srcPath = `./src/${year}/${leftPaddedDay}/a.ts`;
    const dstPath = `./src/${year}/${leftPaddedDay}/b.ts`;
    const partA = Deno.readTextFileSync(srcPath);
    Deno.writeTextFileSync(dstPath, partA);
    console.log(`🎄Done copying part A into B for ${leftPaddedDay}-${year} 🎄`);
}

copy();
