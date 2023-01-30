import React, { useState } from "react";
import getStripe from "../utils/get-stripejs";
import { fetchPostJSON } from "../utils/api-helpers";
import { IData } from "@/pages/api/shoes";
import { Spinner } from "./Spinner";

interface IProps {
  cartItems: IData[];
}

const CheckoutForm = ({ cartItems }: IProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Create a Checkout Session.
    const response = await fetchPostJSON("/api/checkout_sessions", {
      items: cartItems,
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: response.id,
    });

    console.warn(error.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="text-bold text-white bg-black py-6 w-full text-2xl mt-6 rounded-xl">
        {loading ? <Spinner /> : "Continue to Payment"}
      </button>
    </form>
  );
};

export default CheckoutForm;
