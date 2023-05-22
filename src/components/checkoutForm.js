import React, {useContext} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import axios from 'axios';

const checkoutFormOptions = {
    style: {
        base: {
            fontsize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#9e2146'
        }
    },
    hidePostalCode: true
}

const CheckoutForm = ({success = () => {}, amount, orderId}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if(!error) {
            const {id} = paymentMethod;
            await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    id: id,
                    amount: amount,
                    orderId: orderId
                })
            })
                .then(data => data.json())
                .then(status => {
                    alert(status)
                    window.location.assign(`/order/${orderId}`);
                })
                .catch(({message, response}) => {
                    console.log(response ? response.data : message);
                })
            /*try {
                const {data} = await axios.post('/api/payment', JSON.stringify({
                    id: id,
                    amount: amount,
                    orderId: orderId
                }),
                    {
                        headers: {
                            'Content-Type': 'appliction/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                alert(data.status);
                success();
            }
            catch ({message, response}) {
                console.log(response ? response.data : message);
            }*/
        }

        /*if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: `http://localhost:3001/order/${orderId}/complete`,
            },
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
        */
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <CardElement options={checkoutFormOptions} />
            <button className="square_btn">Submit</button>
            <style>{`
                .square_btn {
                    width: 100%;
                    max-width: 150px;
                    display: inline-block;
                    padding: 0.5em 1em;
                    text-decoration: none;
                    background: #668ad8;
                    color: #fff;
                    border-bottom: solid 4px #627295;
                    border-radius: 3px;
                    margin: 20px auto;    
                }
                .square_btn:active {
                    -ms-transform: translateY(4px);
                    -webkit-transform: translateY(4px);
                    transform: translateY(4px);
                    border-bottom: none;
                }
                .checkout-form {
                    width: 100%;
                    max-width: 400px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
            `}</style>
        </form>
    )
};

export default CheckoutForm;