import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import setRoutes from "./routes.js"

const app = express();
app.use(morgan('dev'));
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser())
setRoutes(app);

export default app
