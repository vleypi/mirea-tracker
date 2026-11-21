export const EPSILON = 1e-9;

export const sum = (values: number[]): number => values.reduce((total, value) => total + value, 0);

export const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export const roundUpToHalf = (value: number): number => Math.ceil(value * 2 - EPSILON) / 2;

export const toNonNegativeNumber = (value: string): number => Math.max(0, Number(value) || 0);
