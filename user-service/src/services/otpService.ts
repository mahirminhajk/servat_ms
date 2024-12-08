import Otp, { IOtp } from "../models/Otp";

export class OtpService {
    static async create(data: { code: string, userId: number, userType: string }): Promise<IOtp> {
        const expiresAt = new Date();
        const minutes = process.env.OTP_EXPIRES_IN ? parseInt(process.env.OTP_EXPIRES_IN) : 3;
        expiresAt.setMinutes(expiresAt.getMinutes() + minutes);
        const newOtp = await Otp.create({
            ...data,
            expiresAt,
            retryCount: 0,
            resentCount: 0,
            done: false
        });
        return newOtp;
    }
}