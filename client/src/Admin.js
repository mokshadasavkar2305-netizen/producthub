import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: null
  });

  // 🔐 Admin protection
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // 📦 Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✍️ Handle text input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🖼️ Handle image file
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  // ➕ Add product (with image upload)
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", formData.price);
    form.append("category", formData.category);
    form.append("image", formData.image);

    try {
      await axios.post(
        "http://localhost:5000/api/products/add",
        form
      );

      alert("Product added successfully 🎉");

      setFormData({
        name: "",
        price: "",
        category: "",
        image: null
      });

      fetchProducts();
    } catch (error) {
      alert("Failed to add product ❌");
    }
  };

  // 🗑️ Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      alert("Product deleted 🗑️");
      fetchProducts();
    } catch (error) {
      alert("Delete failed ❌");
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>👑 Admin Dashboard</h1>

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* ➕ ADD PRODUCT */}
      <form onSubmit={handleAddProduct} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {/* 🖼️ IMAGE UPLOAD */}
        <input
          type="file"
          onChange={handleFileChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Add Product ➕
        </button>
      </form>

      {/* 📦 PRODUCTS */}
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            
            <img
              src={
                product.image
                  ? `http://localhost:5000${product.image}`
                  : "https://via.placeholder.com/300"
              }
              alt={product.name}
              style={styles.image}
            />

            <h3>{product.name}</h3>
            <p>₹ {product.price}</p>
            <p>{product.category}</p>

            <button
              onClick={() => handleDelete(product._id)}
              style={styles.deleteBtn}
            >
              Delete ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    padding: "30px",
    fontFamily: "Arial"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  logoutBtn: {
    padding: "10px 16px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  form: {
    display: "grid",
    gap: "15px",
    maxWidth: "500px",
    marginBottom: "40px"
  },

  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px"
  },

  button: {
    padding: "12px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px"
  },

  card: {
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center"
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px"
  },

  deleteBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};