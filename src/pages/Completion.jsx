import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import axios from "axios";

function Completion() {
  const cart = useSelector((state) => state.cart);
  const location=useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  console.log(cart);
  console.log(location);
  console.log(currentUser?.token);
  console.log(currentUser.user._id);
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/order/create", {
          userid:currentUser.user._id,
          orderItems: cart.products.map((item) => ({
          name:item.name,
          quantity: item.quantity,
          image:item.photos[0].secure_url,
          price:item.price,
          product:item._id,
          })),
          shippingInfo: {
            address: "1 Jaipur",
            city: "Jaipur",
            phoneNo: "9898989898",
            postalCode: "302020",
            state: "Rajasthan",
            country: "India"
          },
          paymentInfo: {
            id: "testString"
          },
          taxAmount:0,
          shippingAmount:0,
          totalAmount:cart.total,
        });
        setOrderId(res.data.id);
      } catch {}
    };
     createOrder();
  }, [cart,currentUser]);
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
  )
}
export default Completion;

