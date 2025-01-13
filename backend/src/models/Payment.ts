import mongoose, { Schema, Document } from "mongoose";

interface IPayment extends Document {
  amount: number;
  status: string;
  stripePaymentId: string;
  currency: string;
}

const paymentSchema = new Schema<IPayment>({
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  stripePaymentId: { type: String, required: true },
  currency: { type: String, required: true },
});

export default mongoose.model<IPayment>("Payment", paymentSchema);
