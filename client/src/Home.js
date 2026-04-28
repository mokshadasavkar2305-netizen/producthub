import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { CartContext } from "./CartContext";
import { WishlistContext } from "./WishlistContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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

  return (
    <div style={styles.page}>
        <div style={styles.overlay}></div>
        <div style={styles.container}></div>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1>Welcome to ShopZone 🛍️</h1>
        <p>Your Premium Shopping experience Starts here..</p>
      </div>

      {/* Search + Category Filter */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search products..."
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
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products */}
      <h2 style={{color: "white", textAlign: "center"}}>
        Featured Products
      </h2>

      <div style={styles.grid}>
        {filteredProducts.length === 0 ? (
          <p style={{color: "white"}}>No products found 😢</p>
        ) : (
          filteredProducts.map((item) => (
            <div key={item._id} 
                 style={styles.card}
                 onMouseEnter={(e) =>
                 (e.currentTarget.style.transform =
                    "translateY(-4px)")
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
                  src={item.image}
                  alt={item.name}
                  style={styles.image}
                />

                <h3>{item.name}</h3>
              </Link>

              <p>{item.category}</p>
              <p>₹ {item.price}</p>

              <button
                style={styles.cartBtn}
                onClick={() => addToCart(item)}
              >
                Add to Cart 🛒
              </button>

              <button
                style={styles.wishlistBtn}
                onClick={() => addToWishlist(item)}
              >
                Add to Wishlist ❤️
              </button>
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
    position: "relative",
    fontFamily: "Arial, sans-serif"
  },

  container:
  {
    position: "relative",
    zIndex: 2
  },

  hero: {
    textAlign: "center",
    padding: "60px 20px",
    color: "brown",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    marginBottom: "40px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
  },

  controls: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
    flexWrap: "wrap",
    justifyContent: "center"
  },

  search: {
    flex: 1,
    minWidth: "250px",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    outline: "none",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
  },

  select: {
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    outline: "none",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px"
  },


  card: {
    borderRadius: "16px",
    padding: "20px",
    textAlign: "center",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    color: "black",
    transition: "0.3s ease",
    cursor: "pointer"
  },

  link: {
    textDecoration: "none",
    color: "black"
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "10px"
  },

  cartBtn: {
    marginTop: "10px",
    padding: "12px",
    background: "linear-gradient(135deg, #111, #333)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    width: "100%"
  },

  wishlistBtn: {
    marginTop: "10px",
    padding: "12px",
    background: "linear-gradient(135deg, #ff4d6d, #ff1e56)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    width: "100%"
  }
};