export type ZeroToOne = number & { __zeroToOne: never };

export function createZeroToOne(value: number): ZeroToOne {
    if (value >= 0 && value <= 1) {
        return value as ZeroToOne;
    } else {
        throw new Error("Value must be between 0 and 1.");
    }
}
