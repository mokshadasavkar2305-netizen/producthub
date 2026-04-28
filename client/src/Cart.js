import { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p style={styles.empty}>Your cart is empty 😢</p>
      ) : (
        <>
          <div style={styles.grid}>
            {cart.map((item) => (
              <div key={item._id} style={styles.card}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.image}
                />

                <h3>{item.name}</h3>
                <p>₹ {item.price}</p>

                {/* Quantity Controls */}
                <div style={styles.qtyBox}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => decreaseQty(item._id)}
                  >
                    −
                  </button>

                  <span style={styles.qty}>
                    {item.qty}
                  </span>

                  <button
                    style={styles.qtyBtn}
                    onClick={() => increaseQty(item._id)}
                  >
                    +
                  </button>
                </div>

                <button
                  style={styles.removeBtn}
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove ❌
                </button>
              </div>
            ))}
          </div>

          {/* TOTAL + CHECKOUT */}
          <div style={styles.summary}>
            <h2>Total: ₹ {total}</h2>

            <Link to="/checkout">
              <button style={styles.checkoutBtn}>
                Proceed to Checkout 🧾
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "30px"
  },

  title: {
    textAlign: "center",
    marginBottom: "30px"
  },

  empty: {
    textAlign: "center",
    fontSize: "18px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px"
  },

  card: {
    border: "1px solid #ddd",
    borderRadius: "14px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px"
  },

  qtyBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    margin: "15px 0"
  },

  qtyBtn: {
    width: "35px",
    height: "35px",
    border: "none",
    background: "#111",
    color: "white",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "18px"
  },

  qty: {
    fontSize: "18px",
    fontWeight: "bold"
  },

  removeBtn: {
    background: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  summary: {
    marginTop: "40px",
    textAlign: "center"
  },

  checkoutBtn: {
    marginTop: "15px",
    padding: "14px 24px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px"
  }
};