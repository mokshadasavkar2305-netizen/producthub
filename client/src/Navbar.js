// src/Navbar.js

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully 👋");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <h2 style={styles.logo}>🛍️ ShopZone</h2>

      {/* Navigation Links */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Home
        </Link>

        <Link to="/cart" style={styles.link}>
          Cart 🛒
        </Link>

        <Link to="/wishlist" style={styles.link}>
          Wishlist ❤️
        </Link>

        <Link to="/orders" style={styles.link}>
          Orders 📦
        </Link>

        <Link to="/admin" style={styles.link}>
          Admin 👑
        </Link>

        {/* Auth Section */}
        {user ? (
          <>
            <span style={styles.user}>
              Hi, {user.name} 👋
            </span>

            <button
              onClick={handleLogout}
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login 🔐
            </Link>

            <Link to="/signup" style={styles.link}>
              Signup ✨
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 40px",
    background: "#111",
    color: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
  },

  logo: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold"
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "22px"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500"
  },

  user: {
    fontSize: "15px",
    fontWeight: "500"
  },

  logoutBtn: {
    padding: "8px 16px",
    background: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px"
  }
};