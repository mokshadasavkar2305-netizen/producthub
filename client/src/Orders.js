import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://producthub-backend-k3mj.onrender.com/api/orders"
      );

      setOrders(res.data);
    } catch (error) {
      console.log("Failed to fetch orders", error);
    }
  };

  const getOrderStatus = (index) => {
    const statusList = [
      "🟡 Processing",
      "🔵 Shipped",
      "🟣 Out for Delivery",
      "🟢 Delivered"
    ];

    return statusList[index % statusList.length];
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📦 My Orders</h1>

      {orders.length === 0 ? (
        <p style={styles.empty}>
          No orders found 😢
        </p>
      ) : (
        <div style={styles.grid}>
          {orders.map((order, index) => (
            <div
              key={order._id}
              style={styles.card}
            >
              <h3 style={styles.orderId}>
                Order ID: {order._id}
              </h3>

              <p>
                <strong>Total Amount:</strong> ₹
                {order.totalAmount}
              </p>

              <p>
                <strong>Payment Method:</strong>{" "}
                {order.paymentMethod}
              </p>

              <p>
                <strong>Items:</strong>{" "}
                {order.items.length}
              </p>

              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(
                  order.createdAt
                ).toLocaleString()}
              </p>

              <div style={styles.statusBox}>
                <strong>Status:</strong>{" "}
                <span style={styles.status}>
                  {getOrderStatus(index)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    minHeight: "100vh",
    background:
      "linear-gradient(to right, #f8f9fa, #eef2f3)",
    fontFamily: "Arial, sans-serif"
  },

  title: {
    textAlign: "center",
    marginBottom: "35px",
    fontSize: "34px",
    fontWeight: "700"
  },

  empty: {
    textAlign: "center",
    fontSize: "18px",
    marginTop: "50px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "25px"
  },

  card: {
    background: "white",
    padding: "24px",
    borderRadius: "18px",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.08)",
    transition: "0.3s ease",
    border: "1px solid #f1f1f1"
  },

  orderId: {
    marginBottom: "15px",
    fontSize: "18px",
    wordBreak: "break-word"
  },

  statusBox: {
    marginTop: "18px",
    padding: "14px",
    background: "#fafafa",
    borderRadius: "12px",
    border: "1px solid #eee"
  },

  status: {
    fontWeight: "700",
    fontSize: "15px"
  }
};