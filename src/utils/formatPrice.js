const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** Formats a number as a US dollar amount, e.g. 34.5 -> "$34.50". */
export const formatPrice = (value) => currency.format(value);
