import jwt from "jsonwebtoken";

// export const generateToken = (payload: any): string => { };

export const verifyToken = (token: string): any => { };

export const generateOtoken = (payload: { u: number, o: number }): string => {    
    return jwt.sign(payload, process.env.OTOKEN_JWT_SECRET!, { expiresIn: process.env.OTOKEN_JWT_EXPIRES_IN });
};

export const verifyOtoken = (token: string): { id: number, otpId: number } | null => {
    try {
        // return jwt.verify(token, process.env.OTOKEN_JWT_SECRET!) as { id: number, otpId: number };
        const decoded = jwt.verify(token, process.env.OTOKEN_JWT_SECRET!);
        if (typeof decoded === "object" && decoded.hasOwnProperty("u") && decoded.hasOwnProperty("o")) {
            return { id: decoded.u, otpId: decoded.o };
        }
        return null;
    } catch (error) {
        return null;
    }
};