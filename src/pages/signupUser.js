import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Make a POST request to your signup API endpoint
        const response = await axios.post('http://localhost:3000/auth/signup', {
          firstName,
          lastName,
          email,
          password,
        });
        // Handle successful signup
        console.log('Signup successful:', response.data);
        setValidationMessage('Profile created successfully! Now log in !');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        //navigate('/login');
      } catch (error) {
        // Handle signup error
        console.error('Error signing up:', error);
        setError('An error occurred during signup');
        setValidationMessage('Error creating profile');
      }
    };
  
    return (
      <div className="card text-center mx-auto mt-5" style={{ width: '400px' }}>
        <div className="card-body">

        {validationMessage && (
          <div className={`alert ${validationMessage.startsWith('Error') ? 'alert-danger' : 'alert-success'}`} role="alert">
            {validationMessage}
          </div>
        )}

          <h1 className="card-title">Signup</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"
              />
            </div>
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
            <button type="submit" className="btn btn-dark">Sign up</button>
          </form>
          {error && <p>{error}</p>}
          <p>
            Already have an account? <Link to="/loginUser">Login</Link>
          </p>
        </div>
      </div>
    );
  };
  
  export default SignupPage;
  