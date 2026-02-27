import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function ContactForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    empname: "",
    empid: "",
    companyName: "",
    companyOwner: "",
    noOfEmployees: "",
    description: "",
    tags: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("https://employee-backend.onrender.com/add", {
      ...form,
      tags: form.tags.split(",")
    });

    alert("Employee Added Successfully!");
    navigate("/employees");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Contact Form</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Emp Name"
            value={form.empname}
            onChange={e => setForm({ ...form, empname: e.target.value })}
          />

          <input
            placeholder="Emp ID"
            value={form.empid}
            onChange={e => setForm({ ...form, empid: e.target.value })}
          />

          <input
            placeholder="Company Name"
            value={form.companyName}
            onChange={e => setForm({ ...form, companyName: e.target.value })}
          />

          <input
            placeholder="Company Owner"
            value={form.companyOwner}
            onChange={e => setForm({ ...form, companyOwner: e.target.value })}
          />

          <input
            type="number"
            placeholder="No of Employees"
            value={form.noOfEmployees}
            onChange={e => setForm({ ...form, noOfEmployees: e.target.value })}
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />

          <input
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={e => setForm({ ...form, tags: e.target.value })}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;