import { NextFunction, Response, Router, Request } from "express";
import { validateRequest } from "@km12dev/shared-servat";

import { CustomerService } from "../../services/customerService";
import { registerValidator } from "../middlewares/customerValidator";
import { hashPassword } from "../../utils";
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


export default router;
