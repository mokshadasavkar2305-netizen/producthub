import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const totalAmount = cart.reduce(
    (total, item) =>
      total + item.price * item.qty,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/orders/add",
        {
          items: cart,
          totalAmount,
          paymentMethod
        }
      );

      alert(
        `Order placed successfully using ${paymentMethod} 🎉`
      );

      clearCart();
      navigate("/");
    } catch (error) {
      alert("Failed to place order ❌");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>💳 Checkout</h1>

        <h2>Total Amount: ₹ {totalAmount}</h2>

        <h3>Select Payment Method</h3>

        <div style={styles.options}>
          <label>
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            UPI Payment
          </label>

          <label>
            <input
              type="radio"
              value="Card"
              checked={paymentMethod === "Card"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            Debit / Credit Card
          </label>
        </div>

        <button
          style={styles.button}
          onClick={handlePlaceOrder}
        >
          Place Order 🚀
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f7f7f7"
  },

  card: {
    width: "500px",
    background: "white",
    padding: "40px",
    borderRadius: "14px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
  },

  options: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    margin: "25px 0"
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px"
  }
};