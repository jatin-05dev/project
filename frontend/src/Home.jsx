import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const userId = localStorage.getItem("user_id");

  const [user, setUser] = useState({});
  const [marks, setMarks] = useState([]);

  const [form, setForm] = useState({
    subject: "",
    marks: ""
  });

  const [msg, setMsg] = useState("");

  // get user + marks
  const getData = () => {
    try {
      const res =  axios.get(`http://localhost:8000/home/${userId}/`);
      setUser(res.data.user);
      setMarks(res.data.marks);
    } catch (err) {
      console.log("error loading data");
    }
  };

  useEffect(() => {
    getData();
  }, []); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addMarks = (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:8000/add-marks/", {
        user: userId,
        subject_name: form.subject,
        marks: form.marks
      });

      setMsg("Marks added");
      setForm({ subject_name: "", marks: "" });

      getData(); // refresh table
    } catch (err) {
      setMsg("Failed to add marks");
    }
  };

  return (
    <div>
      <h2>Home</h2>

      <h3>Name: {user.name}</h3>
      <h4>Email: {user.email}</h4>
      <h4>City: {user.city}</h4>

      <hr />

      <h3>Add Marks</h3>
      <form onSubmit={addMarks}>
        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          name="marks"
          placeholder="Marks"
          value={form.marks}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Add</button>
      </form>

      <p>{msg}</p>

      <hr />

      <h3>Marks Table</h3>

      <table border="1">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((m, i) => (
            <tr key={i}>
              <td>{m.subject}</td>
              <td>{m.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}