import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [address, setAddress] = useState('');
  const [validationMessage, setValidationMessage] = useState('');


  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/me');
      const userData = response.data.data.user;
      setUser(userData);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setGender(userData.gender || '');
      setNationality(userData.nationality || '');
      setAddress(userData.address || '');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
        const updatedUserData={};
        if (firstName !== '') {
            updatedUserData.firstName = firstName;
          }else {
            updatedUserData.firstName= null; 
          }
      
          if (lastName !== '') {
            updatedUserData.lastName = lastName;
          }else {
            updatedUserData.lastName = null; 
          }
      
          if (gender !== '') {
            updatedUserData.gender = gender;
          }else {
            updatedUserData.gender = null; 
          }
      
          if (nationality !== '') {
            updatedUserData.nationality = nationality;
          }else {
            updatedUserData.nationality = null; 
          }
      
          if (address !== '') {
            updatedUserData.address = address;
          }else {
            updatedUserData.address = null; 
          }
      await axios.patch('http://localhost:3000/users/me/update/bio', updatedUserData);
      setValidationMessage('Profile updated successfully');    } 
      catch (error) {
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

        <h2 className="card-title">Profile Page</h2>

        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nationality">Nationality:</label>
          <input
            type="text"
            className="form-control"
            id="nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
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

        <button className="btn btn-dark" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
