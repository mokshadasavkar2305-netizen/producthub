import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/products/add",
        formData
      );

      alert("Product added successfully 🎉");

      setFormData({
        name: "",
        price: "",
        image: "",
        category: ""
      });

      fetchProducts();
    } catch (error) {
      alert("Failed to add product ❌");
    }
  };

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

  return (
    <div style={styles.page}>
      <h1>👑 Admin Dashboard</h1>

      {/* Add Product Form */}
      <form
        onSubmit={handleAddProduct}
        style={styles.form}
      >
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
          name="image"
          placeholder="Image URL"
          value={formData.image}
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

        <button
          type="submit"
          style={styles.button}
        >
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div style={styles.grid}>
        {products.map((product) => (
          <div
            key={product._id}
            style={styles.card}
          >
            <img
              src={product.image}
              alt={product.name}
              style={styles.image}
            />

            <h3>{product.name}</h3>
            <p>₹ {product.price}</p>
            <p>{product.category}</p>

            <button
              onClick={() =>
                handleDelete(product._id)
              }
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px"
  },

  form: {
    display: "grid",
    gap: "15px",
    marginBottom: "40px",
    maxWidth: "500px"
  },

  input: {
    padding: "14px",
    border: "1px solid #ccc",
    borderRadius: "8px"
  },

  button: {
    padding: "14px",
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
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)"
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