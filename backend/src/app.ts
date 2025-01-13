import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./database/connectDB";
import paymentRoute from "./routes/payment.routes";

dotenv.config();

const app: Application = express();

// database connection
connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response): void => {
  res.send("WMR Server is Running");
});

app.use("/api/v1/payment", paymentRoute);

app.post("/data", (req: Request, res: Response): void => {
  const data = req.body.d;
  res.json({ message: "Data received", data });
});

export default app;
