import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignupForm.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



  const LoginSignupForm = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [ustId, setUstId] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [gmail, setGmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
  
    const toggleForm = () => {
      setIsSignUp(!isSignUp);
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', { ustId, password }); // adjust port if needed
        const token = res.data.token;
        setMessage("Login successful!");
        localStorage.setItem('token', token); // Store token for future authenticated requests
        // Optional: Navigate to dashboard or home
      } catch (err) {
        setMessage(err.response?.data?.message || "Something went wrong");
      }
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:5000/api/auth/register', {
            ustId,
            userName,
            password,
            confirmPassword,
            gender,
            gmail,
            dateOfBirth
          });
          setMessage(res.data.message);
          setIsSignUp(false); // switch to login after successful registration
        } catch (err) {
          setMessage(err.response?.data?.message || "Registration failed");
        }
      };

  return (
    <div className={`container ${isSignUp ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {!isSignUp ? (
            <form className="sign-in-form" onSubmit={handleLogin}>
              <h2 className="title">Sign in</h2>
              {message && <p style={{ color: 'red' }}>{message}</p>}
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="UST ID"
                  value={ustId}
                  onChange={(e) => setUstId(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          ) : (
            <form className="sign-up-form"  onSubmit={handleRegister}>
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
      type="text"
      placeholder="UST ID"
      value={ustId}
      onChange={(e) => setUstId(e.target.value)}
      required
    />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
      type="text"
      placeholder="User Name"
      value={ustId}
      onChange={(e) => setUserName(e.target.value)}
      required
    />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
      type="email"
      placeholder="Gmail"
      value={gmail}
      onChange={(e) => setGmail(e.target.value)}
      required
    />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
      type="password"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
    />
              </div>
              <div className="input-field">
  <i className="fas fa-venus-mars"></i>
  <select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    required
    className="styled-select"
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Gay">Gay</option>
    <option value="Lesbian">Lesbian</option>
    <option value="Other">Other</option>
    <option value="Prefer not to say">Prefer not to say</option>
  </select>
</div>
              <div className="input-field">
                <i className="	fas fa-calendar-alt"></i>
                <input
      type="date"
      placeholder="Date of Birth"
      value={dateOfBirth}
      onChange={(e) => setDateOfBirth(e.target.value)}
      required
    />
              </div>
              <input type="submit" className="btn" value="Register" />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <button className="btn transparent" onClick={toggleForm}>
              Sign up
            </button>
          </div>
          <img src="log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button className="btn transparent" onClick={toggleForm}>
              Sign in
            </button>
          </div>
          <img src="register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;
