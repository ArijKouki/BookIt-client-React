import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupHotelPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [stars, setStars] = useState('');
  const [photo, setPhoto] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/hotels/register', {
        email,
        password,
        name,
        address,
        phone,
        stars,
        photo,
      });
      console.log('Hotel registered successfully');
      setValidationMessage('Profile created successfully! Now log in !');
      setEmail('');
      setPassword('');
      setName('');
      setAddress('');
      setPhone('');
      setStars('');
      setPhoto('');
    } catch (error) {
      console.error('Error registering hotel:', error);
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

        <h2 className="card-title">Hotel Signup</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Hotel Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="stars">Stars:</label>
            <input
              type="number"
              className="form-control"
              id="stars"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="photo">Photo:</label>
            <input
              type="file"
              className="form-control"
              id="photo"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark">
            Sign up
          </button>
        </form>

        <p className="mt-3">
          Already have an account? <Link to="/loginHotel">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupHotelPage;