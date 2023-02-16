import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'


export const CheckoutForm = ({amount,cartproducts}) => 
{
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

    if(!error) {
        try {
            const {id} = paymentMethod;
            console.log(`ID IS ${id}`);
            const response = await axios.post("http://localhost:4000/api/v1/checkout/payment", {
                amount:{amount},
                id,
            })
            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }
        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
};
return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
    <CardElement />
    <button>Pay</button>
    </form>
);
};