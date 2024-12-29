import { Router } from "express";

import uploadFileRoute from "./uploadFileRoute";

const combinedRouter = Router();

combinedRouter.use("/", uploadFileRoute);

export default combinedRouter;