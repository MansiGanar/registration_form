import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/welcome');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="form">
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div class="row">
      <div class="col-25">
      <label>Email:</label></div>
      <div class="col-75">
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      </div>
      </div>
      <div class="row">
      <div class="col-25">
      <label>Password:</label>
      </div>
      <div class="col-75">
      <input
        type="password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      </div>
      </div>
      <div class="row">
      <button type="submit">Register</button>
      </div>
      <p>
        Don't have an account? <Link to="/login">Login here</Link>
      </p>
      
    </form>
    </div>
    </form>
    
  );
}

export default RegisterForm;
