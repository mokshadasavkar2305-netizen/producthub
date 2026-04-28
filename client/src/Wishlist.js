import { useContext } from "react";
import { WishlistContext } from "./WishlistContext";

export default function Wishlist() {
  const {
    wishlist,
    removeFromWishlist
  } = useContext(WishlistContext);

  return (
    <div style={{ padding: "30px" }}>
      <h1>❤️ My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>No wishlist items yet 😢</p>
      ) : (
        wishlist.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px"
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              width="150"
            />

            <h3>{item.name}</h3>
            <p>₹ {item.price}</p>

            <button
              onClick={() =>
                removeFromWishlist(item._id)
              }
            >
              Remove ❌
            </button>
          </div>
        ))
      )}
    </div>
  );
}