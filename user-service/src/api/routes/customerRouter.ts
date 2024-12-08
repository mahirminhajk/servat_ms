import { NextFunction, Response, Router, Request } from "express";
import { BadRequestErr, ErrTypes, validateRequest } from "@km12dev/shared-servat";

import { CustomerService } from "../../services/customerService";
import { registerValidator, verifyValidator } from "../middlewares/customerValidator";
import { generateToken, hashPassword } from "../../utils";
import { AuthService } from "../../services/authService";

const router = Router();

router.post("/register", registerValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, phone, password } = req.body;

        const existingCustomer = await CustomerService.getByPhone(phone);
        if (existingCustomer) {
            res.status(400).json({ message: "Phone number already exists, Please Login.", type: "ALREADY_EXIST" });
            return;
        }

        const hashedPassword = hashPassword(password);
        const newCustomer = await CustomerService.create({ name, phone, password: hashedPassword });

        const otoken = await AuthService.register(newCustomer);

        res
            .setHeader("x-otoken", otoken)
            .status(201)
            .json({
                message: "OTP sent to your phone number, please verify.",
                data: {
                    id: newCustomer.id,
                    name: newCustomer.name,
                    phone: newCustomer.phone,
                }
            })

        //TODO: publish event

    } catch (error) {
        next(error);
    }
});

router.post("/verify", verifyValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { otp } = req.body;
        const otoken = req.header("x-otoken");

        const userId = await AuthService.verify(otoken!, otp);
        if (!userId) {
            return next(new BadRequestErr("Invalid OTP, Please resend.", ErrTypes.INVALID));
        }

        //* verify user
        const user = await CustomerService.verify(userId);
        if (!user) {
            return next(new BadRequestErr("User not found.", ErrTypes.NOT_FOUND));
        }

        const token = generateToken({ id: user.id!, phone: user.phone });

        res
            .setHeader("x-token", token)
            .status(200)
            .json({
                message: "OTP verified successfully.",
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


export default router;
