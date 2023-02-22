import { useState } from "react";
import {PaymentElement,CardElement,useStripe,useElements} from '@stripe/react-stripe-js';

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
      
      const url=`${window.location.origin}/completion`;
      console.log(url);
      console.log(`secret is ${secret}`);
      // console.log(elements.getElement(CardElement));
  
      // stripe.confirmCardPayment(
      //   secret,
      //   {
      //     payment_method: {
      //       card: elements.getElement(CardElement),
      //       billing_details: {
      //         name: 'Jenny Rosen',
      //       },
      //     },
      //   }
      // ).then(result=>{
      //   console.log(result);
      //   console.log("SUCCESS");
      // }).catch((error)=>{
      //   console.log(error);
      // })

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${window.location.origin}/completion`,
        },
      });
  
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occured.");
      }
      setIsProcessing(false);
};
return (
    <form id="payment-form" onSubmit={handleSubmit}>
    <PaymentElement id="payment-element" />
    <button disabled={isProcessing || !stripe || !elements} id="submit">
      <span id="button-text">
        {isProcessing ? "Processing ... " : "Pay now"}
      </span>
    </button>
    {/* Show any error or success messages */}
    {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
