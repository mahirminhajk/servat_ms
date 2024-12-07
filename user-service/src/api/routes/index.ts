import { Router } from "express";

import customerRouter from "./customerRouter";

const combinedRouter = Router();

combinedRouter.use("/customer", customerRouter);

export default combinedRouter;