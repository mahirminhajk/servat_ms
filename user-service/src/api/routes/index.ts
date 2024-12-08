import { Router } from "express";

import customerRouter from "./customerRouter";
import providerRouter from "./providerRouter";

const combinedRouter = Router();

combinedRouter.use("/customer", customerRouter);
combinedRouter.use("/provider", providerRouter);

export default combinedRouter;