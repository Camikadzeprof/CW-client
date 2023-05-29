import React, {useState, useEffect} from "react";
import {useStripe, PaymentRequestButtonElement} from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";
import {useParams} from "react-router-dom";

const Payment = (props) => {
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState(null);
    let {amount, orderId} = useParams();
    amount = Math.round(Number(amount) * 100);

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'byn',
                total: {
                    label: `Order №${orderId} payment`,
                    amount
                },
                requestPayerName: true,
                requestPayerEmail: false,
                requestPayerPhone: false,
            });
            pr.canMakePayment()
                .then((result) => {
                    if (result) {
                        console.log(result);
                        setPaymentRequest(pr);
                    }
                })
                .catch(console.error)
        }
    }, [stripe, amount])
    if (paymentRequest) {
        paymentRequest.on('paymentmethod', async (event) => {
            const {id} = event.paymentMethod;
            await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(data => {
                    event.complete('success');
                    console.log(data);
                })
                .catch(({message, response}) => {
                    event.complete('fail');
                    console.log(response ? response.data : message);
                })
        })
    }

    return (
        <>
            {paymentRequest ? (
                <PaymentRequestButtonElement options={{ paymentRequest: paymentRequest}}/>
            ) : (
                <CheckoutForm amount={amount} orderId={orderId}/>
            )}
        </>
    )
}

export default Payment;