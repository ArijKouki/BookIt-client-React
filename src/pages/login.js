import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <i className="bi bi-building fs-1 mb-3"></i>
              <h5 className="card-title">Hotel Login</h5>
              <p className="card-text">Login as a hotel</p>
              <Link to="/loginHotel" className="btn btn-dark">
                Login as Hotel
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <i className="bi bi-person fs-1 mb-3"></i>
              <h5 className="card-title">User Login</h5>
              <p className="card-text">Login as a user</p>
              <Link to="/loginUser" className="btn btn-dark">
                Login as User
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
