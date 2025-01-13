export const validateCurrency = (currency: string) => {
  const supportedCurrencies = ["jpy", "php"];
  if (!supportedCurrencies.includes(currency)) {
    throw new Error("Unsupported currency. Please use JPY or PHP.");
  }
};
