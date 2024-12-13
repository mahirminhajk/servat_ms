import { Router } from "express";

const combinedRouter = Router();

combinedRouter.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

export default combinedRouter;