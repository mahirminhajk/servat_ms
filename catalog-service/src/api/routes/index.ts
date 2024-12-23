import { Router } from "express";

import serviceRouter from "./ServiceRoute";

const combinedRouter = Router();

combinedRouter.use("/", serviceRouter);

export default combinedRouter;