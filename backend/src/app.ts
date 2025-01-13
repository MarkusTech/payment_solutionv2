import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response): void => {
  res.send("WMR Server is Running");
});

app.post("/data", (req: Request, res: Response): void => {
  const data = req.body.d;
  res.json({ message: "Data received", data });
});

export default app;
