import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: ""
  });

  const [image, setImage] = useState(null);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT PRODUCT
  const submit = async () => {
  const data = new FormData();

  data.append("name", form.name);
  data.append("price", form.price);
  data.append("category", form.category);
  data.append("image", image);

  try {
    await axios.post(
      "http://localhost:5000/api/products/add",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    alert("Product added successfully ✅");
  } catch (err) {
  console.log("FULL ERROR:", err.response?.data || err.message);
  alert("Error adding product ❌");
}
};

  return (
    <div style={styles.page}>
      <h2>Add Product ➕</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        style={styles.input}
      />

      <button onClick={submit} style={styles.btn}>
        Add Product
      </button>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  page: {
    padding: "20px",
    maxWidth: "400px",
    margin: "auto"
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px"
  },
  btn: {
    width: "100%",
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};