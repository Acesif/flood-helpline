import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Feed from './components/Feed';
import Search from './components/Search';
import Navbar from './components/Navbar';
import Heatmap from './components/Heatmap';
import UserProfile from './components/UserProfile'
import './App.css'

function App() {
  return (
    <Router>
      <Navbar /> 
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/heatmap" element={<Heatmap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
