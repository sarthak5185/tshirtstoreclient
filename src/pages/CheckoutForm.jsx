import { useState } from "react";
import {PaymentElement,CardElement,useStripe,useElements,AddressElement} from '@stripe/react-stripe-js';
import { useHistory } from "react-router";

export const CheckoutForm = ({secret,clientamount,cartproducts}) => 
{
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [address, setAddress] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
      setIsProcessing(true);
      const url=`${window.location.origin}/completion`;
      console.log(url);
      console.log(`secret is ${secret}`);
      const {error} = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/completion`,
        },
      });
      //  history.push({
      //   pathname:'/completion',
      //   search:`?payment_intent=pi_3MezdmSCVcQff5PA1xiKhHtF&payment_intent_client_secret=pi_3MezdmSCVcQff5PA1xiKhHtF_secret_GoW4p4efand8FWoMk1fLV0oW9&redirect_status=succeeded`,
      //   state:{ detail: address}
      //  });
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occured.");
      }
      setIsProcessing(false);

};
return (
    <form id="payment-form" onSubmit={handleSubmit}>
    <AddressElement options={{mode: 'shipping'}} onChange={(event)=>{
      if (event.complete) {
        const address = event.value.address;
        setAddress(address);
        console.log(address);
      }
    }}/>  
    <PaymentElement id="payment-element" />
    <button disabled={isProcessing || !stripe || !elements || !address} id="submit">
      <span id="button-text">
        {isProcessing ? "Processing ... " : "Pay now"}
      </span>
    </button>
    {/* Show any error or success messages */}
    {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

