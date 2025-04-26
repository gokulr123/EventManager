import React, { useState } from "react";
import Login from "../components/Login"; // Corrected import path
import Register from "../components/Register"; // Corrected import path


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          {isLogin ? <Login /> : <Register />}
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>{isLogin ? "New here?" : "Already have an account?"}</h3>
            <p>
              {isLogin
                ? "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!"
                : "Login to access your dashboard."}
            </p>
            <button className="btn transparent" onClick={toggleAuthMode}>
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
          <img src="/img/log.svg" className="image" alt="log" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>{isLogin ? "One of us?" : "New here?"}</h3>
            <p>
              {isLogin
                ? "Login to access your dashboard"
                : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti."}
            </p>
            <button className="btn transparent" onClick={toggleAuthMode}>
              {isLogin ? "Login" : "Sign up"}
            </button>
          </div>
          <img src="/img/register.svg" className="image" alt="register" />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
