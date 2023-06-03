import React, { useState } from 'react';
import './Navbar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Navbar = ({ isLoggedIn,loggedInRole, handleLogout }) => {
    const [showDropdown, setShowDropdown] = useState(false); // Track dropdown visibility
    const navigate = useNavigate();

  
    const handleDropdownToggle = () => {
      setShowDropdown(!showDropdown);
    };
  
    const handleLogoutClick = async () => {
      try {
        const logoutUrl = loggedInRole === 'user' ? 'http://localhost:3000/auth/logout' : 'http://localhost:3000/hotels/logout';
        await axios.post(logoutUrl);
        handleLogout();
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <nav className="navbar">
        <Link to={loggedInRole === 'user' ? "/": "/hotelRooms"} style={{ textDecoration: 'none' }}>
        <div className="logo">Book'It</div>
        </Link>
        {isLoggedIn ? (
          <div className="dropdown-container">
            <button className="btn btn-dark" onClick={handleDropdownToggle}>
              {isLoggedIn}
            </button>

            {showDropdown && (
              <div className="dropdown">
                <Link to={loggedInRole === 'user' ? "/profile": "profileHotel"} className="dropdown-item">Profile</Link>
                <Link to={loggedInRole === 'user' ? "/bookings":"hotelBookings"} className="dropdown-item">My bookings</Link>
                <button className="dropdown-item" onClick={handleLogoutClick}>
                  Logout
                </button>
              </div>
            )}

          </div>
        ) : (
            <Link to="/login" className="btn btn-dark" style={{ textDecoration: 'none' }}>
            Login
          </Link>
        )}
      </nav>
    );
  };

  export default Navbar;
  