import express, { ErrorRequestHandler } from "express";
import { errHandler, NotFoundErr } from "@km12dev/shared-servat";
import cors from "cors";
import path from "path";

import combinedRouter from "./routes";

const app = express();

//* middleware
if (process.env.NODE_ENV === "development") {
    app.use(require("morgan")("dev"));
}
app.set("trust proxy", true); // express behind proxy(nginx)

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* serve static files
app.use("/api/v1/upload/files", express.static(path.join(__dirname, '../../mnt/uploads')));

//* routes
app.use("/api/v1/upload", combinedRouter);

//* not found route
app.use(() => {
    throw new NotFoundErr("Route not found.");
});

app.use(errHandler as ErrorRequestHandler);

export default app;