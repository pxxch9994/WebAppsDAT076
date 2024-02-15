import React from 'react';
import './style/App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Lost from './pages/Lost';
import Profile from './pages/Profile';
import Forum from "./pages/Forum";
import Login from "./pages/Login";
import DevTest from "./pages/DevTest";

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lost" element={<Lost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/devtest" element={<DevTest />} />
          </Routes>
    </Router>
  );
}

export default App;
