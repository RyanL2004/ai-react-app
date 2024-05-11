import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import './signup.css'; // Import the CSS file

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      navigate('/account');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="wrapper">
      <h1>Sign In to your account</h1>
      <p>
        Don't have an account yet? <Link to="/Signup" className="underline">Sign Up.</Link>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label>Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3"
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="input-box">
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <button className="btn">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;
