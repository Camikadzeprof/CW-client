import React, {useContext} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

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
                    alert(status.status)
                    window.location.assign(`/order/${orderId}`);
                })
                .catch(({message, response}) => {
                    console.log(response ? response.data : message);
                })
        }
        else {
            alert('Проверьте правильность введённых данных');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <CardElement options={checkoutFormOptions} />
            <button className="square_btn">Оплатить {amount / 100} BYN</button>
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