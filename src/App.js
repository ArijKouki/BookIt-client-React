import React,{ useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/home';
import ProfilePage from './pages/profile';
import SignupPage from './pages/signupUser';
import LoginHotel from './pages/LoginHotel';
import SignupHotelPage from './pages/SignupHotelPage';
import LoginUser from './pages/loginUser';
import LoginPage from './pages/login';
import ProfileHotel from './pages/profileHotel';
import HotelDetails from './pages/hotelDetails';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInRole, setLoggedInRole] = useState(null);

  const handleLoginSuccess = (name) => {
    console.log(name);
    setIsLoggedIn(name);
  };

  useEffect(() => {
    console.log(loggedInRole);
  }, [loggedInRole]);
  

  const handleLogout = () => {
    console.log(isLoggedIn);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} loggedInRole={loggedInRole} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loginUser" element={<LoginUser onLoginSuccess={handleLoginSuccess} setLoggedInRole={setLoggedInRole} />} />
        <Route path="/loginHotel" element={<LoginHotel onLoginSuccess={handleLoginSuccess} setLoggedInRole={setLoggedInRole} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profileHotel" element={<ProfileHotel />} />
        <Route path="/signupUser" element={<SignupPage />} />
        <Route path="/signupHotel" element={<SignupHotelPage />} />
        <Route path="/hotelDetails/:hotelId" element={<HotelDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

