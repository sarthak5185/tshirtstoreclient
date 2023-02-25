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
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await axios.post("http://localhost:4000/api/v1/order/create", {
          user: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address:"13 sn",
        });
        setOrderId(res.data._id);
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

