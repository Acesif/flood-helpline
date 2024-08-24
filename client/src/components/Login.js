import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Select, Input, Button } from "antd";

function Login() {
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { phoneNumber, password });
      localStorage.setItem("token", res.data.token);
      navigate("/feed");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "12px" }}>লগ ইন</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="phoneNumber" style={{ marginBottom: "8px" }}>
            ফোন নম্বর:{" "}
          </label>
          <Input id="phoneNumber" onChange={(e) => setphoneNumber(e.target.value)} value={phoneNumber} placeholder="আপনার ফোন নম্বর" required />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="password" style={{ marginBottom: "8px" }}>
            পাসওয়ার্ড:{" "}
          </label>
          <Input.Password id="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="আপনার পাসওয়ার্ড" required />
        </div>

        <Button type="primary" htmlType="submit" size="large">
          লগ ইন
        </Button>
      </form>

      <Button type="default" style={{ width: "100%" }} onClick={() => navigate("/signup")} size="large">
        সাইন আপ
      </Button>
    </div>
  );
}

export default Login;
