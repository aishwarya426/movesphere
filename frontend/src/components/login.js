import React, { useState } from 'react';
import '../styles/style.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email');
      return false;
    }

    if (!password) {
      setError('Password is required');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!user) {
      setError('Invalid email or password');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));

    navigate('/dashboard');
  };

  return (
    <section className="auth-form">
      <h2>Login</h2>

      {error && (
        <p style={{ color: 'red', marginBottom: '15px' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
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

        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>

      <p>
        Don't have an account?{' '}
        <Link to="/signup">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default Login;