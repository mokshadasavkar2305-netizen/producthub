// src/Orders.js

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
        "http://localhost:5000/api/orders"
      );

      setOrders(res.data);
    } catch (error) {
      console.log("Failed to fetch orders", error);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📦 My Orders</h1>

      {orders.length === 0 ? (
        <p style={styles.empty}>
          No orders found 😢
        </p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={styles.card}
          >
            <h3>Order ID: {order._id}</h3>

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
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    minHeight: "80vh",
    background: "#f7f7f7"
  },

  title: {
    marginBottom: "30px"
  },

  empty: {
    fontSize: "18px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
  }
};