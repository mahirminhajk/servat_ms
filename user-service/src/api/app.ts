import express, { Request, Response, NextFunction } from "express";

import combinedRouter from "./routes";

const app = express();

//* middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* routes
app.use("/", combinedRouter);

//* not found route
app.use((req, res) => {
    res.status(404).send("Not found");
});

//* error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

export default app;