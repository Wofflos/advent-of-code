# 🎄 Advent of Code

## Setup

Set up files for a specific day:

```bash
pnpm run setup [DD] [YYYY]
```

-   `DD`: Day of the month (1, 2, 3...).
-   `YYYY`: Year (2021, 2022, 2023...).

Both parameters are optional. If not provided, the current date will be used.
This command creates source files (`a.ts` and `b.ts`) and data files (`input.txt` and `input-test.txt`).

## Copy Solution

Copy content from `a.ts` to `b.ts`:

```bash
pnpm copy [DD] [YYYY]
```

-   `DD`: Day of the month (1, 2, 3...).
-   `YYYY`: Year (2021, 2022, 2023...).

Both parameters are optional. If not provided, the current date will be used.

## Solve

To solve a specific day's puzzle:

```bash
pnpm solve [DD] [YYYY] [--b] [--test]
```

-   `DD`: Day of the month (1, 2, 3...).
-   `YYYY`: Year (2021, 2022, 2023...).

Both parameters are optional. If not provided, the current date will be used.

Flags:

-   `--b`: Use `b.ts` as the source file.
-   `--test`: Use `input-test.txt` as the input data file.

#🎄✨
<sup>Festejale bien 🎅</sup>
