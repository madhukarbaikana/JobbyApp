import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import './index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    navigate('/');
  };

  const onSubmitFailure = (data) => {
    setShowErrorMsg(true);
    setErrorMsg(data);
  };

  const submitLoginDetails = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const apiUrl = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    if (response.ok) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <form className="login-form-container" onSubmit={submitLoginDetails}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="login-website-logo"
        />
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
            <br />
            <input
              type="text"
              id="username"
              value={username}
              className="input-field"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </label>
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
            <br />
            <input
              type="password"
              id="password"
              value={password}
              className="input-field"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </label>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
        
 <div className="temporary-container">
          <p className="temporary-description">UserName: rahul</p>
          <p className="temporary-description">Password: rahul@2021</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
