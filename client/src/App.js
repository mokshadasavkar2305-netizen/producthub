// src/App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Wishlist from "./Wishlist";
import Admin from "./Admin";
import ProductDetails from "./ProductDetails";
import Login from "./Login";
import Signup from "./Signup";
import Orders from "./Orders";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Checkout */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Wishlist */}
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Orders */}
        <Route path="/orders" element={<Orders />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Product Details */}
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}