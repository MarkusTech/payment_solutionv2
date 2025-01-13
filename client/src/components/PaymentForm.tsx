import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useStripePayment } from "../hooks/useStripePayment";
import "./PaymentForm.css";

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { createPaymentIntent, isProcessing } = useStripePayment();
  const [name, setName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    const expiryElement = elements.getElement(CardExpiryElement);
    const cvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !expiryElement || !cvcElement) return;

    const paymentDetails = {
      amount: 1000,
      currency: "jpy",
    };

    try {
      const { clientSecret } = await createPaymentIntent(paymentDetails);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
            billing_details: { name },
          },
        }
      );

      if (error) {
        console.error(error.message);
      } else if (paymentIntent?.status === "succeeded") {
        console.log("Payment succeeded!", paymentIntent);
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <h2>Complete Your Payment</h2>
        <input
          type="text"
          placeholder="Card Holder Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
        <div className="card-elements">
          <div className="card-number-container">
            <label>Card Number</label>
            <CardNumberElement className="card-element" />
          </div>
          <div className="expiration-cvc-container">
            <div className="expiration-container">
              <label>Expiration Date</label>
              <CardExpiryElement className="card-element" />
            </div>
            <div className="cvc-container">
              <label>CVC</label>
              <CardCvcElement className="card-element" />
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isProcessing || !stripe}
          className="submit-button"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
