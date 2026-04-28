import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const { cart } = useContext(CartContext);

  const [shakeCart, setShakeCart] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      setShakeCart(true);

      setTimeout(() => {
        setShakeCart(false);
      }, 500);
    }
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully 👋");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <h2 style={styles.logo}>🛍️ ShopZone</h2>

      {/* Links */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Home
        </Link>

        {/* Cart with Badge + Shake */}
        <div
          style={{
            ...styles.cartWrapper,
            ...(shakeCart ? styles.shake : {})
          }}
        >
          <Link to="/cart" style={styles.link}>
            Cart 🛒
          </Link>

          {cart.length > 0 && (
            <span style={styles.badge}>
              {cart.length}
            </span>
          )}
        </div>

        <Link to="/wishlist" style={styles.link}>
          Wishlist ❤️
        </Link>

        <Link to="/orders" style={styles.link}>
          Orders 📦
        </Link>

        <Link to="/admin" style={styles.link}>
          Admin 👑
        </Link>

        {/* Auth */}
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

            <Link to="/signup" style={styles.signupBtn}>
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
    position: "sticky",
    top: 0,
    zIndex: 999,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 40px",
    background: "rgba(17,17,17,0.92)",
    backdropFilter: "blur(14px)",
    color: "white",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    borderBottom: "1px solid rgba(255,255,255,0.08)"
  },

  logo: {
    margin: 0,
    fontSize: "30px",
    fontWeight: "800",
    letterSpacing: "0.5px",
    cursor: "pointer"
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "600",
    transition: "0.3s ease"
  },

  signupBtn: {
    textDecoration: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #ff4d6d, #ff1e56)",
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 8px 20px rgba(255,30,86,0.25)"
  },

  cartWrapper: {
    position: "relative"
  },

  badge: {
    position: "absolute",
    top: "-10px",
    right: "-14px",
    background: "#ff2d55",
    color: "white",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
    boxShadow: "0 4px 12px rgba(255,45,85,0.3)"
  },

  shake: {
    animation: "cartShake 0.5s ease"
  },

  user: {
    fontSize: "14px",
    fontWeight: "600",
    background: "rgba(255,255,255,0.08)",
    padding: "8px 14px",
    borderRadius: "10px"
  },

  logoutBtn: {
    padding: "10px 18px",
    background: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 8px 20px rgba(255,77,77,0.2)"
  }
};