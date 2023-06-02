import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const LoginUser = ({ onLoginSuccess,setLoggedInRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      if (response.status === 200) {
        const { firstName } = response.data.data;
        onLoginSuccess(firstName);
        setLoggedInRole("user");
        navigate('/');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="card text-center mx-auto mt-5" style={{ width: '400px' }}>
      <div className="card-body">
        <h1 className="card-title">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>

          <div style={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
           <button type="submit" className="btn btn-dark" style={{ width: 'fit-content' }}>Login</button>
           <p>Not signed up yet?<Link to="/signupUser"> Create an account</Link></p>
          </div>
        </form>

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default LoginUser;
