import { randomInt } from "node:crypto";

export const generateOtp = (): number => {
    return randomInt(100000, 999999);
};