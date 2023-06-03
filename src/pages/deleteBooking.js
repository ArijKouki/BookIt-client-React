import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const DeleteBookingPage = () => {

    const { bookingId } = useParams();


  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    try{
        const response = await axios.delete(`http://localhost:3000/bookings/delete/${bookingId}`);
        console.log(response);
        navigate('/bookings');
    }catch (error) {
        console.error('Error deleting the bookings:', error);
    }
   
  };

  const handleCancel = () => {
    navigate('/bookings');
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="card text-center">
        <div className="card-body">
          <h2 className="card-title">Delete Booking</h2>
          <p className="card-text">Are you sure you want to delete this booking?</p>

          <div className="mt-4">
            <button className="btn btn-danger mx-2" onClick={handleConfirmDelete}>Confirm Delete</button>
            <button className="btn btn-primary mx-2" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookingPage;
