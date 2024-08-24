import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [phoneNumber, setphoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { phoneNumber, password });
      localStorage.setItem('token', res.data.token);
      navigate('/feed');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>লগ ইন</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={phoneNumber} 
          onChange={(e) => setphoneNumber(e.target.value)} 
          placeholder="আপনার ফোন নম্বর" 
          maxLength="11" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="আপনার পাসওয়ার্ড" 
          required 
        />
        <button type="submit">লগ ইন</button>
        <button onClick={()=>navigate("/signup")}>সাইন আপ</button>
      </form>
    </div>
  );
}

export default Login;
