import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/users/login',
        { email, password },
        { withCredentials: 'include' }
      );

      // Check the status code and response
      if (response.status === 200) {
        console.log('Login successful:', response.data); // Debugging
        navigate('/dashboard'); // Navigate to the dashboard on successful login
      } else {
        console.log('Unexpected status code:', response.status); // Debugging
      }
    } catch (err) {
      console.error('Login error:', err.response?.data); // Debugging
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Don't have an account? <NavLink to="/register">Register</NavLink>
      </p>
    </div>
  );
};

export default Login;
