import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Select, Input, Button } from "antd";

function Signup() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://flood-helpline-server.vercel.app/api/auth/signup", {
        username,
        phoneNumber,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/feed");
      window.location.reload();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "12px" }}>সাইন আপ</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="name" style={{ marginBottom: "8px" }}>
            নাম:{" "}
          </label>
          <Input id="name" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="আপনার নাম প্রবেশ করুন" required />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="number" style={{ marginBottom: "8px" }}>
            ফোন নম্বর:{" "}
          </label>
          <Input id="number" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} placeholder="আপনার ফোন নম্বর প্রবেশ করুন" required />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="password" style={{ marginBottom: "8px" }}>
            পাসওয়ার্ড:{" "}
          </label>
          <Input.Password id="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="আপনার পাসওয়ার্ড নম্বর প্রবেশ করুন" required />
        </div>

        <Button type="primary" htmlType="submit" size="large">
          সাইন আপ
        </Button>
      </form>

      <Button type="default" style={{ width: "100%" }} onClick={() => navigate("/login")} size="large">
        লগ ইন
      </Button>
    </div>
  );
}

export default Signup;
