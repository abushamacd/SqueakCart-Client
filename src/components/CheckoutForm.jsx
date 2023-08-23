import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateIntentMutation,
  useCreateOrderMutation,
} from "../redux/features/order/orderApi";
import { useGetUserProfileQuery } from "../redux/features/user/userApi";
import { useNavigate } from "react-router-dom";
import { setView } from "../redux/features/site/siteSlice";
import { useDispatch } from "react-redux";

const CheckoutForm = ({ products, total }) => {
  const dispatch = useDispatch();
  const { data } = useGetUserProfileQuery();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const [
    createOrder,
    {
      isSuccess: orderIsSuccess,
      data: orderData,
      isError: orderIsError,
      error: orderError,
      reset: orderReset,
    },
  ] = useCreateOrderMutation();

  const [
    createIntent,
    { isSuccess: intentIsSuccess, data: intentData, isError: intentIsError },
  ] = useCreateIntentMutation();

  useEffect(() => {
    if (total && !intentIsSuccess) {
      createIntent({ total });
    }
  }, [total, intentIsSuccess, createIntent]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
    } else {
      setProcessing(true);
      const { paymentIntent: paymentConfirm, error: confirmError } =
        await stripe.confirmCardPayment(intentData?.data?.clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: data?.data?.lastname,
              email: data?.data?.email,
            },
          },
        });

      if (confirmError) {
        toast.error(confirmError?.message);
      } else {
        setProcessing(false);
        if (paymentConfirm.status === "succeeded") {
          createOrder({
            data: {
              products,
              paymentMethod: "Card",
              paymentStatus: "Paid",
              tnxId: paymentConfirm.id,
              total,
            },
          });
        } else {
          toast.error("Payment Failed");
        }
      }
    }
  };

  if (orderIsSuccess) {
    toast(orderData?.message);
    dispatch(setView({ data: null, state: false }));
    navigate("/profile/myorders");
    orderReset();
  } else if (orderIsError) {
    toast.error(orderError?.data?.message);
  }
  return (
    <>
      {intentIsError ? (
        <h4 className="text-2xl text-red-500">
          Server error. Please, try again later
        </h4>
      ) : (
        <form className="p-4" onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          {!processing && (
            <button
              className="first_button mt-4 duration-300 rounded-full px-5 py-2 text-sm text-white"
              type="submit"
              disabled={!stripe}
            >
              Pay
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default CheckoutForm;
