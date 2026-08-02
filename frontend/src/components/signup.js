import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const criteria = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isStrongPassword = Object.values(criteria).every(Boolean);

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!isStrongPassword) {
      setError('Password does not meet the required criteria');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      setError('User already exists with this email');
      return;
    }

    users.push({
      fullName,
      email,
      phone,
      password,
    });

    localStorage.setItem('users', JSON.stringify(users));

    alert('Account created successfully! Please login.');

    navigate('/login');
  };

  return (
    <section className="auth-form">
      <h2>Sign Up</h2>

      {error && (
        <p style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSignup} noValidate>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div className="password-criteria">
          <p>Password must contain:</p>
          <ul>
            <li style={{ color: criteria.length ? 'green' : 'red' }}>
              At least 8 characters
            </li>

            <li style={{ color: criteria.uppercase ? 'green' : 'red' }}>
              At least 1 uppercase letter
            </li>

            <li style={{ color: criteria.number ? 'green' : 'red' }}>
              At least 1 number
            </li>

            <li style={{ color: criteria.special ? 'green' : 'red' }}>
              At least 1 special character
            </li>
          </ul>
        </div>

        <button className="btn btn-primary" type="submit">
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default SignUp;