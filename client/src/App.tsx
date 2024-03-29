import React from 'react';
import './style/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Forum from "./pages/Forum";
import Login from "./pages/Login";
import DevTest from "./pages/DevTest";

function App() {
  return (
      // Navigation using router v6
    <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/devtest" element={<DevTest />} />
          </Routes>
    </Router>
  );
}

export default App;
