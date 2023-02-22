import { useState } from "react";
import {PaymentElement,CardElement,useStripe,useElements} from '@stripe/react-stripe-js';
import { Redirect } from "react-router-dom";
export const CheckoutForm = ({secret,clientamount,cartproducts}) => 
{
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
      setIsProcessing(true);
      
      console.log(window.location.origin);
      console.log(`secret is ${secret}`);
      console.log(elements.getElement(CardElement));
  
      stripe.confirmCardPayment(
        secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: 'Jenny Rosen',
            },
          },
        }
      ).then(result=>{
        console.log(result);
        console.log("SUCCESS");
        return <Redirect to="/completion" />
      }).catch((error)=>{
        console.log(error);
      })
      setIsProcessing(false);
};
return (
    <form id="payment-form" onSubmit={handleSubmit}>
    <label htmlFor="card">Card</label>
    <CardElement id="card" />
    <button type="submit">Pay</button>
    </form>
  );
}
