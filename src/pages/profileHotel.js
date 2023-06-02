import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileHotel = () => {
  const [hotel, setHotel] = useState({});
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stars, setStars] = useState(0);
  const [photo, setPhoto] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    fetchHotelData();
  }, []);

  const fetchHotelData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/hotels/mine');
      console.log(response );
      const hotelData = response.data.data;
      setHotel(hotelData);
      setName(hotelData.name);
      setAddress(hotelData.address || '');
      setPhone(hotelData.phone || '');
      setEmail(hotelData.email);
      setPassword(hotelData.password || '');
      setStars(hotelData.stars || 0);
      setPhoto(hotelData.photo || '');
    } catch (error) {
      console.error('Error fetching hotel data:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedHotelData = {
        name,
        address,
        phone,
        email,
        password,
        stars,
        photo,
      };
      await axios.patch('http://localhost:3000/hotels/mine/update', updatedHotelData);
      setValidationMessage('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setValidationMessage('Error updating profile');
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

        <h2 className="card-title">Hotel Profile Page</h2>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="stars">Stars:</label>
          <input
            type="number"
            className="form-control"
            id="stars"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo:</label>
          <input
            type="text"
            className="form-control"
            id="photo"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>

        <button className="btn btn-dark" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHotel;
