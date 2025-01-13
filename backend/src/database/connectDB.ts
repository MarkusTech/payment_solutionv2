import mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as colors from "colors";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(
      colors.green.bold(
        `Database connected on ${connect.connection.host}: ${connect.connection.name}`
      )
    );
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
