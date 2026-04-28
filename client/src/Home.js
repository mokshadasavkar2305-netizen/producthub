import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { CartContext } from "./CartContext";
import { WishlistContext } from "./WishlistContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [flyingId, setFlyingId] = useState(null);
  const [flyingWishlistId, setFlyingWishlistId] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  useEffect(() => {
    axios
      .get("https://producthub-backend-k3mj.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((item) => item.category))
  ];

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item) => {
    addToCart(item);

    setFlyingId(item._id);
    setShowToast(true);

    setTimeout(() => {
      setFlyingId(null);
    }, 800);

    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  };

  const handleAddToWishlist = (item) => {
    addToWishlist(item);

    setFlyingWishlistId(item._id);

    setTimeout(() => {
      setFlyingWishlistId(null);
    }, 800);
  };

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Welcome to ShopZone 🛍️
        </h1>

        <p style={styles.heroSubtitle}>
          Discover premium shopping with luxury style,
          smooth experience, and beautiful products ✨
        </p>
      </div>

      {/* Toast */}
      {showToast && (
        <div style={styles.toast}>
          ✅ Added to Cart Successfully
        </div>
      )}

      {/* Search + Filter */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search premium products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          {categories.map((cat, index) => (
            <option
              key={index}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Heading */}
      <h2 style={styles.heading}>
        Featured Products
      </h2>

      {/* Products Grid */}
      <div style={styles.grid}>
        {filteredProducts.length === 0 ? (
          <p style={styles.noProducts}>
            No products found 😢
          </p>
        ) : (
          filteredProducts.map((item) => (
            <div
              key={item._id}
              style={styles.card}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(-10px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(0px)")
              }
            >
              <Link
                to={`/product/${item._id}`}
                style={styles.link}
              >
                <img
                  src={
                    item.image ||
                    "https://via.placeholder.com/300"
                  }
                  alt={item.name}
                  style={styles.image}
                />

                <h3 style={styles.productName}>
                  {item.name}
                </h3>
              </Link>

              <p style={styles.category}>
                {item.category}
              </p>

              <p style={styles.price}>
                ₹ {item.price}
              </p>

              {/* Cart Button */}
              <div style={styles.cartWrapper}>
                <button
                  style={styles.cartBtn}
                  onClick={() =>
                    handleAddToCart(item)
                  }
                >
                  Add to Cart 🛒
                </button>

                {flyingId === item._id && (
                  <div style={styles.flyingCart}>
                    🛒
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <div style={styles.wishlistWrapper}>
                <button
                  style={styles.wishlistBtn}
                  onClick={() =>
                    handleAddToWishlist(item)
                  }
                >
                  Add to Wishlist ❤️
                </button>

                {flyingWishlistId === item._id && (
                  <div style={styles.flyingHeart}>
                    ❤️
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    fontFamily: "Arial, sans-serif"
  },

  hero: {
    textAlign: "center",
    padding: "70px 30px",
    borderRadius: "24px",
    marginBottom: "45px",
    background: "rgba(255,255,255,0.10)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.25)"
  },

  heroTitle: {
    fontSize: "42px",
    marginBottom: "15px",
    color: "#2d1f14"
  },

  heroSubtitle: {
    fontSize: "18px",
    color: "#3b2a20",
    maxWidth: "700px",
    margin: "0 auto"
  },

  controls: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "35px"
  },

  search: {
    flex: 1,
    minWidth: "280px",
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    outline: "none",
    fontSize: "15px",
    background: "rgba(255,255,255,0.9)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)"
  },

  select: {
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    outline: "none",
    fontSize: "15px",
    background: "rgba(255,255,255,0.9)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)"
  },

  heading: {
    textAlign: "center",
    color: "white",
    marginBottom: "30px",
    fontSize: "32px",
    fontWeight: "bold"
  },

  noProducts: {
    color: "white",
    textAlign: "center",
    fontSize: "18px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(270px, 1fr))",
    gap: "28px"
  },

  card: {
    padding: "22px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    textAlign: "center",
    transition: "0.35s ease",
    color: "#111"
  },

  link: {
    textDecoration: "none",
    color: "#111"
  },

  image: {
    width: "100%",
    height: "240px",
    objectFit: "cover",
    borderRadius: "16px",
    marginBottom: "14px"
  },

  productName: {
    fontSize: "20px",
    marginBottom: "8px"
  },

  category: {
    fontSize: "14px",
    opacity: 0.8
  },

  price: {
    fontSize: "22px",
    fontWeight: "bold",
    margin: "12px 0"
  },

  cartWrapper: {
    position: "relative"
  },

  wishlistWrapper: {
    position: "relative"
  },

  cartBtn: {
    width: "100%",
    padding: "14px",
    marginTop: "10px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    color: "white",
    fontWeight: "600",
    background:
      "linear-gradient(135deg, #111, #333)"
  },

  wishlistBtn: {
    width: "100%",
    padding: "14px",
    marginTop: "12px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    color: "white",
    fontWeight: "600",
    background:
      "linear-gradient(135deg, #ff4d6d, #ff1e56)"
  },

  flyingCart: {
    position: "absolute",
    bottom: "55px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "30px",
    zIndex: 999,
    pointerEvents: "none",
    animation: "flyToCart 0.8s ease forwards"
  },

  flyingHeart: {
    position: "absolute",
    bottom: "55px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "30px",
    zIndex: 999,
    pointerEvents: "none",
    animation: "flyToWishlist 0.8s ease forwards"
  },

  toast: {
    position: "fixed",
    top: "100px",
    right: "30px",
    background: "#111",
    color: "white",
    padding: "14px 24px",
    borderRadius: "14px",
    fontWeight: "600",
    zIndex: 9999,
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
    animation: "slideIn 0.4s ease"
  }
};