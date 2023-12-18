
import { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'

function StripePayment(props) {
    const { stripePromise } = props;
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/api/auth/payments/submit-payment")
            .then((res) => res.json())
            .then(({ clientSecret }) => setClientSecret(clientSecret));
    }, []);


    return (
        <>
            <h1>Payment</h1>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret, }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
}

export default StripePayment;