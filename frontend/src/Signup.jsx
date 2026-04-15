import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() { 
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to Django
      const res = await axios.post("http://localhost:8000/Signup/", form);
      
      setMsg("Signup Successful! User ID: " + res.data.user_id);
      setForm({ name: "", email: "", phone: "", city: "", password: "" });
      
      // Redirect to login after success
      setTimeout(() => navigate("/Login/"), 2000);
    } catch (err) {
      console.error(err);
      setMsg("Signup Failed. Please check server connection.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required /><br /><br />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br /><br />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} /><br /><br />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} /><br /><br />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br /><br />
        <button type="submit">Signup</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}