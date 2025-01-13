import React, { createContext, useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QggPUFaicgd4LE8Lcbvb3bt9fE1egamX4JlqE3BgX107nc9u0xqjTxr20euaQ0CEthYlBLU1qfu2bRN92pLpfWK00vYjYVa8g"
); // Replace with your Stripe publishable key

// Define the type for props
interface StripeProviderProps {
  children: React.ReactNode; // Explicitly define children as a prop
}

const StripeContext = createContext<null | {
  stripePromise: ReturnType<typeof loadStripe>;
}>(null);

export const useStripeContext = () => useContext(StripeContext);

const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  return (
    <StripeContext.Provider value={{ stripePromise }}>
      <Elements stripe={stripePromise}>{children}</Elements>
    </StripeContext.Provider>
  );
};

export default StripeProvider;
