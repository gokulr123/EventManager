import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [ustId, setUstId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { ustId, password });
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleLogin} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                type="text"
                placeholder="UST ID"
                name="ustId"
                value={ustId}
                onChange={(e) => setUstId(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Join our platform by registering first</p>
            <Link to="/register">
              <button className="btn transparent">Register</button>
            </Link>
          </div>
          <img src="log.svg" className="image" alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
