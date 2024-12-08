import { BadRequestErr, ErrTypes } from "@km12dev/shared-servat";
import { ICustomer } from "../models/Customer";
import { generateOtoken, generateOtp, hashOTP } from "../utils";
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
};
