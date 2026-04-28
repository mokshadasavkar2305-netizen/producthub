import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "./CartContext";
import { WishlistContext } from "./WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <h2 style={{ padding: "30px" }}>Loading...</h2>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <img
          src={product.image}
          alt={product.name}
          style={styles.image}
        />

        <div style={styles.info}>
          <h1>{product.name}</h1>

          <p style={styles.category}>
            Category: {product.category}
          </p>

          <h2 style={styles.price}>
            ₹ {product.price}
          </h2>

          <p style={styles.desc}>
            Premium quality product with amazing design
            and excellent durability. Perfect for daily
            use and long-lasting performance.
          </p>

          <button
            style={styles.cartBtn}
            onClick={() => addToCart(product)}
          >
            Add to Cart 🛒
          </button>

          <button
            style={styles.wishlistBtn}
            onClick={() => addToWishlist(product)}
          >
            Add to Wishlist ❤️
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px"
  },

  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    alignItems: "center"
  },

  image: {
    width: "100%",
    borderRadius: "16px",
    objectFit: "cover",
    maxHeight: "500px"
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  category: {
    color: "#666",
    fontSize: "18px"
  },

  price: {
    color: "green",
    fontSize: "32px"
  },

  desc: {
    lineHeight: "1.7",
    color: "#444"
  },

  cartBtn: {
    padding: "14px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px"
  },

  wishlistBtn: {
    padding: "14px",
    background: "#ff4d6d",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px"
  }
};