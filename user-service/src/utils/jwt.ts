import jwt from "jsonwebtoken";

export const generateToken = (payload: { id: number, phone: string }): string => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN });
 };

export const verifyToken = (token: string): {id: number, phone: string}|null => {
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET!);
        if (typeof decode === "object" && decode.hasOwnProperty("id") && decode.hasOwnProperty("phone")) {
            return { id: decode.id, phone: decode.phone };
        }
        return null;
    } catch (error) {
        return null;
    }
 };

export const generateOtoken = (payload: { u: number, o: number }): string => {
    return jwt.sign(payload, process.env.OTOKEN_JWT_SECRET!, { expiresIn: process.env.OTOKEN_JWT_EXPIRES_IN });
};

export const verifyOtoken = (token: string): { id: number, otpId: number } | null => {
    try {
        const decoded = jwt.verify(token, process.env.OTOKEN_JWT_SECRET!);
        if (typeof decoded === "object" && decoded.hasOwnProperty("u") && decoded.hasOwnProperty("o")) {
            return { id: decoded.u, otpId: decoded.o };
        }
        return null;
    } catch (error) {
        return null;
    }
};