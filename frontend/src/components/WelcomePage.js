import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = ({ email, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h1>Hello, {email}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default WelcomePage;
