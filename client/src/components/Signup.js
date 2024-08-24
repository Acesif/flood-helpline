import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        phoneNumber,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/feed");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>সাইন আপ</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="আপনার নাম প্রবেশ করুন"
          required
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="আপনার ফোন নম্বর প্রবেশ করুন"
          maxLength="11"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="আপনার পাসওয়ার্ড নম্বর প্রবেশ করুন"
          required
        />
        <button type="submit">সাইন আপ</button>
        <button onClick={()=>navigate("/login")}>লগ ইন</button>
      </form>
    </div>
  );
}

export default Signup;
