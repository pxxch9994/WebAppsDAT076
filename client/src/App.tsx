import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Lost from './pages/Lost';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lost" element={<Lost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myprofile" element={<MyProfile />} />
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
