import React, { useState } from "react";
import axios from "axios";
import "./reg.css"; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/utilisateur/register", formData);
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("There was an error registering:", error);
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
