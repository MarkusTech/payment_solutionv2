import { useState } from "react";

export const useStripePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const createPaymentIntent = async ({
    amount,
    currency,
  }: {
    amount: number;
    currency: string;
  }) => {
    setIsProcessing(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/payment/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, currency }),
        }
      );

      if (!response.ok) throw new Error("Failed to create payment intent");
      const { clientSecret } = await response.json();
      return { clientSecret };
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return { createPaymentIntent, isProcessing };
};
