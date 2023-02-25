import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import axios from "axios";

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("order/create", 
        {
          user: currentUser._id,
          orderItems: cart.products.map((item) => ({
            product: item._id,
            quantity: item._quantity,
          })),
          totalAmount: cart.total,
          shippingAmount:cart.total,
          taxAmount:0,
          shippingInfo:{
          address:"13 sn",
          },
          paymentInfo:{
            id:"CARDP1",
          }
        });
        console.log(res);
        setOrderId(res.data._id);
      }
      catch(err) {
        console.log(err);
      }
    };
    createOrder();
  },[cart,currentUser]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </div>
  );
};

export default Success;   
