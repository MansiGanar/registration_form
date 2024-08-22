import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'; 
import WelcomePage from './components/WelcomePage';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        setToken(null);
        localStorage.removeItem('token');
      } else {
        setEmail(decodedToken.email);
      }
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const handleSetToken = (newToken) => {
    setToken(newToken);
    const decodedToken = jwtDecode(newToken);
    setEmail(decodedToken.email);
    localStorage.setItem('token', newToken);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!token ? <LoginForm setToken={handleSetToken} /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/register"
          element={!token ? <RegisterForm /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/login"
          element={!token ? <LoginForm /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/welcome"
          element={token ? <WelcomePage email={email} logout={handleLogout} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
