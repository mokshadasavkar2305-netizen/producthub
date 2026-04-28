import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import Orders from "./Orders";
import Admin from "./Admin";
import Checkout from "./Checkout";
import ProductDetails from "./ProductDetails";

import AdminLogin from "./AdminLogin";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      {/* Navbar visible on all pages */}
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* ADMIN LOGIN (PUBLIC) */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* PROTECTED ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;