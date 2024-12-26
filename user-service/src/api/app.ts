import express, { ErrorRequestHandler } from "express";
import { errHandler, NotFoundErr } from "@km12dev/shared-servat";
import cookieParser from "cookie-parser";

import combinedRouter from "./routes";

const app = express();

//* middleware
if(process.env.NODE_ENV === "development") {
    app.use(require("morgan")("dev"));
}
app.set("trust proxy", true); // express behind proxy(nginx)

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* routes
app.use("/api/v1/user", combinedRouter);

//* not found route
app.use(() => {
    throw new NotFoundErr("Route not found.");
});

app.use(errHandler as ErrorRequestHandler);

export default app;