import React, { useState } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';



const LoginHotel = ({ onLoginSuccess,setLoggedInRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        axios.defaults.withCredentials = true;
      const response = await axios.post('http://localhost:3000/hotels/login', { email, password });
      if (response.status === 200) {
        console.log(response);
        console.log('Login successful');
        const { name } = response.data.data;
        onLoginSuccess(name);
        setLoggedInRole("hotel");
        navigate('/');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="card text-center mx-auto mt-5" style={{ width: '400px' }}>
      <div className="card-body">
        <h2 className="card-title">Hotel Login</h2>
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
          <button type="submit" className="btn btn-dark">Login</button>
          <p>Not signed up yet?<Link to="/signupHotel"> Create an account</Link></p>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
export default LoginHotel;
