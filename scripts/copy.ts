import { writeFileSync, readFileSync } from "fs";
import { validateArgs } from "@utils/ts-utils";

function copy() {
    const { year, leftPaddedDay, namedArgs } = validateArgs();
    console.log(`🎄Copying part A into B for ${leftPaddedDay}-${year} 🎄`);
    const srcPath = `./src/${year}/${leftPaddedDay}/a.ts`;
    const dstPath = `./src/${year}/${leftPaddedDay}/b.ts`;
    const partA = readFileSync(srcPath, "utf-8");
    writeFileSync(dstPath, partA);
    console.log(`🎄Done copying part A into B for ${leftPaddedDay}-${year} 🎄`);
}

copy();
