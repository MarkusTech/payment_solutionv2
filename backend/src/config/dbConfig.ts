import * as dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  uri: process.env.MONGODB_URI || "mongodb://localhost:27017/payment_solution",
};

export default dbConfig;
