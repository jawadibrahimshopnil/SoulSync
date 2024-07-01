import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const ContactPay = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center ">Request Contact Information: <span className="text-green-600">$5</span></h2>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default ContactPay;