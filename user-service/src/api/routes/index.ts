import { Router } from "express";

const combinedRouter = Router();

combinedRouter.get("/", (req, res) => {
    res.send("Hello from combined router");
});

export default combinedRouter;