import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import useBiodata from './../../Hooks/useBiodata';
import Loading from "../../Compnents/Loading";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const { biodataId } = useParams();
    const [paymentError, setPaymentError] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const price = 5;

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(({ data }) => {
                setClientSecret(data.clientSecret);
            })
    }, [axiosSecure]);

    const [biodata, bioLoading] = useBiodata(biodataId);
    if (bioLoading) {
        return <Loading />
    }

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            console.log("Payment method error");
            setPaymentError(error.message)
        } else {
            console.log('payment method', paymentMethod);
            setPaymentError('')
        }

        const { paymentIntent, error: confirmingError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });
        if (confirmingError) {
            console.log("confirm errror", confirmingError);
        } else {
            if (paymentIntent.status === "succeeded") {
                
                const paymentData = {
                    tranxId: paymentIntent.id,
                    email: user.email,
                }
                axiosSecure.post("/payment", paymentData)
                .then(({data})=>{
                    if(data.insertedId){
                        toast.success("Payment Successfull");
                    }
                })

                const reqData = {
                    reqByName: user.displayName,
                    reqByEmail: user.email,
                    reqForName: biodata.name,
                    reqForBioId: biodata.biodataId,
                    status: "pending",
                }
                axiosSecure.post("/request-contact", reqData)
                .then(({data})=>{
                    if(data.insertedId){
                        toast.success("Request is Pending for admin approval");
                        navigate("/dashboard/contactreq");
                    }
                })

            }
        }

    }


    return (
        <form onSubmit={handlePayment} className="space-y-4">
            <div>
                <label htmlFor="biodataId" className="block text-sm font-medium text-gray-700">
                    Biodata ID
                </label>
                <input
                    type="text"
                    id="biodataId"
                    value={biodataId}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-600 focus:border-rose-600 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Your Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={user?.email || ''}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-600 focus:border-rose-600 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="cardElement" className="block text-sm font-medium text-gray-700">
                    Card Details
                </label>
                <CardElement className="p-2 border border-gray-300 rounded mb-4 w-full" />
            </div>

            <div>
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                    Payment
                </button>
                {paymentError && <div className="text-red-600 mt-4">{paymentError}</div>}
            </div>
        </form>
    );
};

export default CheckoutForm;