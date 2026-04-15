import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const res = axios.post("http://localhost:8000/Login/", form);

      setMsg("Login successful");

      // optional: store user id
      localStorage.setItem("user_id", res.data.user_id);

      // navigate to home page
      navigate("/home");

    } catch (err) {
      setMsg("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>

      <p>{msg}</p>
    </div>
  );
}