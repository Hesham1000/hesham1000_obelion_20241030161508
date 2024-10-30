import React, { useState } from 'react';
import './EditTask.css';
import axios from 'axios';

const EditTask = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://NoApp-backend.cloud-stacks.com/api/register', {
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setIsRegistered(true);
      setError('');
      alert(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://NoApp-backend.cloud-stacks.com/api/login', {
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setError('');
      alert(response.data.message);
      // Assuming you would redirect to a dashboard or similar page after successful login
      // window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="edit-task-container">
      <h1>{isRegistered ? 'Login' : 'Register'}</h1>
      {error && <p className="error">{error}</p>}
      <form>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={isRegistered ? handleLogin : handleRegister}
        >
          {isRegistered ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default EditTask;
