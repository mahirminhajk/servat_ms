import { NextFunction, Response, Router, Request } from "express";
import { BadRequestErr, ErrTypes, validateRequest, verifyProvider, RequestWithProvider } from "@km12dev/shared-servat";

import { ProviderService } from "../../services/providerService";
import { loginValidator, registerValidator, verifyValidator } from "../middlewares/authValidator";
import { generateTokenProvider, hashPassword } from "../../utils";
import { AuthService } from "../../services/authService";
import { providerVerifiedPublisher } from "../../events";

const router = Router();

router.post("/register", registerValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, phone, password } = req.body;

        const existingProvider = await ProviderService.getByPhone(phone);
        if (existingProvider) {
            res.status(400).json({ message: "Phone number already exists, Please Login.", type: "ALREADY_EXIST" });
            return;
        }

        const hashedPassword = hashPassword(password);
        const newProvider = await ProviderService.create({ name, phone, password: hashedPassword });

        const OtpToken = await AuthService.register(newProvider);

        res
            .cookie("otoken", OtpToken,)
            .status(201)
            .json({
                message: "OTP sent to your phone number, please verify.",
            })

    } catch (error) {
        next(error);
    }
});

router.post("/verify-otp", verifyValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { otp } = req.body;
        const otoken = req.cookies["otoken"];

        const userId = await AuthService.verify(otoken!, otp);
        if (!userId) {
            return next(new BadRequestErr("Invalid OTP, Please resend.", ErrTypes.INVALID));
        }

        //* verify user
        const user = await ProviderService.verify(userId);
        if (!user) {
            return next(new BadRequestErr("User not found.", ErrTypes.NOT_FOUND));
        }

        const token = generateTokenProvider({ id: user.id!, phone: user.phone });

        res
            .cookie("token", token)
            .status(200)
            .json({
                message: "OTP verified successfully.",
                data: {
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                }
            });

        //* publish event
        await providerVerifiedPublisher.publish({
            id: user.id!.toString(),
            name: user.name,
            phone: user.phone,
        });

    } catch (error) {
        next(error);
    }
});

//TODO: resend otp

router.post("/login", loginValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone, password } = req.body;

        const user = await ProviderService.getByPhone(phone);
        if (!user) {
            return next(new BadRequestErr("User not found, Please Register", ErrTypes.NOT_FOUND));
        }

        const token = await AuthService.login(user, password);
        if (!token) {
            return next(new BadRequestErr("Invalid phone number or password.", ErrTypes.INVALID));
        }

        res
            .cookie("token", token)
            .status(200)
            .json({
                message: "Login successful.",
                data: {
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                }
            });

    } catch (error) {
        next(error);
    }
});

router.get("/verify", verifyProvider, async (req: RequestWithProvider, res: Response, next: NextFunction) => {
    if (!req.provider) {
        return next(new BadRequestErr("Provider not found.", ErrTypes.NOT_FOUND));
    }

    //TODO: check the provider is not blacklisted

    res.status(200).json({
        message: "Provider verified successfully.",
        data: {
            id: req.provider.id,
            phone: req.provider.phone,
        }
    });
});



export default router;
