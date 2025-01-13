import React from "react";
import StripeProvider from "./components/StripeContext";
import PaymentForm from "./components/PaymentForm";

const App: React.FC = () => {
  return (
    <StripeProvider>
      <div>
        <h1>React Stripe Payment Integration</h1>
        <PaymentForm />
      </div>
    </StripeProvider>
  );
};

export default App;
