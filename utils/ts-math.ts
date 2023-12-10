/**
 *  https://en.wikipedia.org/wiki/Shoelace_formula
 */
export function getArea(vertices: Array<Array<number>>) {
    const n = vertices.length;
    let area = 0;
    for (let i = 0; i < n; i++) {
        area += vertices[i][0] * (vertices[(i + 1) % n][1] - vertices[(i - 1 + n) % n][1]);
    }

    return 0.5 * Math.abs(area);
}

/**
 * https://en.wikipedia.org/wiki/Pick%27s_theorem
 */
export function getPointsInArea(vertices: Array<Array<number>>) {
    return getArea(vertices) - vertices.length / 2 + 1;
}

export function toNumber(s: string) {
    return parseInt(s.trim());
}

export function findLCM(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0;
    }

    const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
    const calculateLCM = (a: number, b: number): number => Math.abs(a * b) / gcd(Math.abs(a), Math.abs(b));

    return numbers.reduce((lcm, num) => calculateLCM(lcm, num), numbers[0]);
}
