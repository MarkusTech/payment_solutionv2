import { Request, Response } from "express";
import Payment from "../models/Payment";
import { createPaymentIntent } from "../services/stripeServices";
import { validateCurrency } from "../utils/validateCurrency";

export const createPayment = async (req: Request, res: Response) => {
  const { amount, currency } = req.body;

  try {
    // Validate the currency
    validateCurrency(currency);

    // Create the payment intent with Stripe
    const paymentIntent = await createPaymentIntent(amount, currency);

    // Save payment details to MongoDB
    const payment = new Payment({
      amount,
      status: "pending",
      stripePaymentId: paymentIntent.id,
      currency,
    });
    await payment.save();

    // Respond with the client secret
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
