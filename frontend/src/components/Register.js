import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    ustId: '',
    gmail: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert("Registered successfully");
      navigate('/');
    } catch (err) {
      alert(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container sign-up-mode">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleRegister} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                type="text"
                name="ustId"
                placeholder="UST ID"
                value={form.ustId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope" />
              <input
                type="email"
                name="gmail"
                placeholder="Email"
                value={form.gmail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            {/* Optional Fields */}
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                value={form.gender}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Login to access your dashboard</p>
            <Link to="/">
              <button className="btn transparent">Login</button>
            </Link>
          </div>
          <img src="register.svg" className="image" alt="Register" />
        </div>
      </div>
    </div>
  );
};

export default Register;
