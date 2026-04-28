import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    // Load saved wishlist from localStorage
    const savedWishlist =
      localStorage.getItem("wishlist");

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  });

  // Save wishlist every time it changes
  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Add product to wishlist
  const addToWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item._id === product._id
    );

    // Prevent duplicate items
    if (!exists) {
      setWishlist([
        ...wishlist,
        product
      ]);
    }
  };

  // Remove product manually
  const removeFromWishlist = (id) => {
    setWishlist(
      wishlist.filter(
        (item) => item._id !== id
      )
    );
  };

  // Optional: clear all wishlist
  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}