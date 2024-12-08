import { BadRequestErr, ErrTypes } from "@km12dev/shared-servat";
import { ICustomer } from "../models/Customer";
import { compareOTP, generateOtoken, generateOtp, hashOTP, verifyOtoken } from "../utils";
import { OtpService } from "./otpService";

export class AuthService {
    static async register(user: ICustomer): Promise<string> {
        if (!user) throw new BadRequestErr("Can't register user.", ErrTypes.SERVER_ERROR);
        //* generate otp
        const code = generateOtp();
        if (process.env.NODE_ENV === "development") console.log(`📋 OTP SEND TO ${user.phone}: ${code}`);
        
        //TODO: publish event

        //* hash otp
        const hashedCode = hashOTP(code);

        const userType = "customer";

        const otpData = await OtpService.create({
            code: hashedCode,
            userId: user.id!,
            userType,
        });

        const otoken = generateOtoken({
            u: otpData.id!,
            o: user.id!,
        });

        return otoken;
    };

    static async verify(otoken: string, otp: string): Promise<number | null> {
        const decode = verifyOtoken(otoken);
        if (!decode) throw new BadRequestErr("Invalid OTP, Please resend.", ErrTypes.RESEND_OTP);
        
        const otpData = await OtpService.getById(decode.otpId);
        if (!otpData) throw new BadRequestErr("Invalid OTP, Please resend.", ErrTypes.RESEND_OTP);
        
        //* check if otp is expired
        if (otpData.expiresAt < new Date()) throw new BadRequestErr("OTP expired, Please resend.", ErrTypes.EXPIRED);

        //* check otp retry count
        if (otpData.retryCount >= 3) throw new BadRequestErr("OTP retry limit exceeded, Please resend.", ErrTypes.RESEND_OTP);

        //* verify otp
        const isMatch = compareOTP(otp, otpData.code);
        if (!isMatch) {
            otpData.retryCount++;
            await otpData.save();
            throw new BadRequestErr("Invalid OTP, Please retry.", ErrTypes.INVALID_OTP);
        }

        //* update otp
        otpData.done = true;
        await otpData.save();

        //* return user id
        return otpData.userId;
    };

};
