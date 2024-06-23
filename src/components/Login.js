import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Styles/Login.css';

const Login = () => {
  // State variables for username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Accessing login function from AuthContext and navigation function from react-router-dom
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Attempt login with username and password
    const success = await login(username, password);
    if (success) {
      // If login successful, navigate to dashboard
      navigate('/dashboard');
    } else {
      // If login fails, set error message
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card shadow p-4">
        <h2 className="card-title text-center mb-4">LOGIN IN</h2>
        {/* Display error message if login fails */}
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
