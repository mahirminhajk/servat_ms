import { Router } from "express";
import { CustomerService } from "../../services/customerService";

const router = Router();

router.post("/create", async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        const customer = await CustomerService.create({ name, phone, password });

        console.log(customer);

        res.json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something broke!");
    }
});

router.patch("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, password } = req.body;

        const customer = await CustomerService.update(+id, { name, phone, password });

        console.log(customer);

        res.json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something broke!");
    }
});


export default router;
