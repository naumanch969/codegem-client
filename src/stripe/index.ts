import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | undefined;

const getStripe = () => {
  const REACT_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY =
    "pk_live_51MMSQLGezjHRH1HZEgpvx8CaKASfbjz7EuORJJBMEIoLRSf1xgxhSDZxhJDQ3MuKvgXm9mryN5NGPpqjByLdvFMT000Rd5Xayc";

  if (!stripePromise) {
    stripePromise = loadStripe(
      REACT_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    ); //process.env.REACT_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY
  }
  return stripePromise;
};

export default getStripe;
