import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';



const AddRoomPage = () => {
  const [room, setRoom] = useState({
    kind: '',
    price: 0,
    numberAvailable: 0,
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        console.log(room);
        const response = await axios.post(`http://localhost:3000/rooms/new`, room);
        console.log('add:', response);
        navigate('/hotelRooms');
      } catch (error) {
        console.error('Error updating room:', error);
      }  
    setRoom({ kind: '', price: 0, numberAvailable: 0 });
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: '400px' }}>
    <div className="card-body">
      <h2 className="card-title text-center">Add Room</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Room kind:</label>
          <input
            type="text"
            name="kind"
            value={room.kind}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="number"
            name="price"
            value={room.price}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Number Available:</label>
          <input
            type="number"
            name="numberAvailable"
            value={room.numberAvailable}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        

        <div className="text-center">
          <button type="submit" className="btn btn-dark">Add Room</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddRoomPage;
