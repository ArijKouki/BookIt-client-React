import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const DeleteRoomPage = () => {

    const { roomId } = useParams();


  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    try{
        const response = await axios.delete(`http://localhost:3000/rooms/delete/${roomId}`);
        console.log(response);
        navigate('/hotelRooms');
    }catch (error) {
        console.error('Error deleting the bookings:', error);
    }
   
  };

  const handleCancel = () => {
    navigate('/hotelRooms');
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="card text-center">
        <div className="card-body">
          <h2 className="card-title">Delete Room</h2>
          <p className="card-text">Are you sure you want to delete this room?</p>

          <div className="mt-4">
            <button className="btn btn-danger mx-2" onClick={handleConfirmDelete}>Confirm Delete</button>
            <button className="btn btn-primary mx-2" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoomPage;
