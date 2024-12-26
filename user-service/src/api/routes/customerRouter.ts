import { NextFunction, Response, Router, Request } from "express";
import { BadRequestErr, ErrTypes, validateRequest, verifyCustomer, RequestWithCustomer } from "@km12dev/shared-servat";

import { CustomerService } from "../../services/customerService";
import { loginValidator, registerValidator, verifyValidator } from "../middlewares/authValidator";
import { generateToken, hashPassword } from "../../utils";
import { AuthService } from "../../services/authService";
import { customerVerifiedPublisher } from "../../events";

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

        const otpToken = await AuthService.register(newCustomer);

        res
            .cookie("otoken", otpToken)
            .status(201)
            .json({
                message: "OTP sent to your phone number, please verify.",
                data: {
                    id: newCustomer.id,
                    name: newCustomer.name,
                    phone: newCustomer.phone,
                }
            })

    } catch (error) {
        next(error);
    }
});

router.post("/verify-otp", verifyValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { otp } = req.body;
        const otoken = req.cookies["x-otoken"];

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

        //* Customer verified event
        await customerVerifiedPublisher.publish({
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

        const user = await CustomerService.getByPhone(phone);
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

router.get("/verify", verifyCustomer, async (req: RequestWithCustomer, res: Response, next: NextFunction) => {
    if (!req.customer) {
        return next(new BadRequestErr("Customer not found.", ErrTypes.NOT_FOUND));
    }

    //TODO: check the customer is not blacklisted

    res.status(200).json({
        message: "Customer verified successfully.",
        data: {
            id: req.customer.id,
            phone: req.customer.phone,
        }
    });
});



export default router;
