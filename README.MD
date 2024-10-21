# 🎄 Advent of Code

## Setup

Set up files for a specific day:

```bash
deno task setup [--day=DD] [--year=YYYY]
```

-   `--day=DD`: Day of the month (1, 2, 3...).
-   `--year=YYYY`: Year (2021, 2022, 2023...).

Both parameters are optional. If not provided, the current date will be used.
This command creates source files (`a.ts` and `b.ts`) and data files (`input.txt` and `input-test.txt`).

## Copy Solution

Copy content from `a.ts` to `b.ts`:

```bash
deno task copy [--day=DD] [--year=YYYY]
```

-   `--day`: Day of the month (1, 2, 3...).
-   `--year`: Year (2021, 2022, 2023...).

Both parameters are optional. If not provided, the current date will be used.

## Solve

To solve a specific day's puzzle:

```bash
deno task solve [--day=DD] [--year=YYYY] [--part=a|b] [--test]
```

-   `--day`: Day of the month (1, 2, 3...).
-   `--year`: Year (2021, 2022, 2023...).
-   `--part`: a|b (source file)

Parameters are optional. If not provided, the current date will be used and `a.ts`.

Flags:

-   `--test`: Use `input-test.txt` as the input data file.

#🎄✨
