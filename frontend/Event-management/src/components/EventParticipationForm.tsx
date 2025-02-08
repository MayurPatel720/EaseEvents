/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api, useFetchEventByID } from "../Queries/Allquery";

const EventParticipationForm: React.FC = () => {
  const { eventId }: any = useParams<{ eventId: string }>();
  const {
    data: event,
    error,
    isLoading: fetchingEvent,
  } = useFetchEventByID(eventId);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const amount = 500;
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (document.getElementById("razorpay-script")) {
          resolve(true);
          return;
        }
        const script = document.createElement("script");
        script.id = "razorpay-script";
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  const handleFreeRegistration = async () => {
    if (!name || !email || !phone) {
      alert("Please fill in all the fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${api}/payment/create-order`, {
        amount,
        name,
        email,
        phone,
        eventId,
      });

      alert("Registration successful! Check your email for confirmation.");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!name || !email || !phone) {
      alert("Please fill in all the fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const orderResponse = await axios.post(`${api}/payment/create-order`, {
        amount,
        name,
        email,
        phone,
        eventId,
      });

      const {
        id: order_id,
        amount: order_amount,
        currency,
      } = orderResponse.data;

      const options = {
        key: "rzp_test_z9CNJTXfsMnl3s",
        amount: order_amount,
        currency,
        name: "Event Registration",
        description: "Ticket Payment",
        order_id,
        handler: async function (response: any) {
          try {
            const verifyResponse = await axios.post(
              `${api}/payment/verify-payment`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyResponse.data.success) {
              alert("Payment successful! Check your email for the ticket.");
            } else {
              alert("Payment verification failed!");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Payment verification error. Please contact support.");
          }
        },
        prefill: {
          name,
          email,
          contact: phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (fetchingEvent) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-md mx-auto p-6 border rounded-md shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Participate in Event {event.title}
      </h2>
      <p className="text-black">Tickets available : {event.ticketsAvailable}</p>
      <form className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
        {event.ticketCategory === "free" ? (
          <button
            type="button"
            onClick={handleFreeRegistration}
            className={`w-full py-2 text-white rounded-md ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : `Register`}
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePayment}
            className={`w-full py-2 text-white rounded-md ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : `Pay ₹${amount} & Register`}
          </button>
        )}
      </form>
    </div>
  );
};

export default EventParticipationForm;
