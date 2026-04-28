import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Signup failed ❌"
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>✨ Signup</h1>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
          >
            Signup
          </button>
        </form>

        <p style={styles.text}>
          Already have an account?{" "}
          <Link to="/login">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5"
  },

  card: {
    width: "420px",
    background: "white",
    padding: "40px",
    borderRadius: "14px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
  },

  title: {
    textAlign: "center",
    marginBottom: "30px"
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px"
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
  },

  text: {
    marginTop: "20px",
    textAlign: "center"
  }
};