import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateRoomPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [room, setRoom] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/rooms/${roomId}`);
        console.log('get room:', response);
        setRoom(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching room information');
        setIsLoading(false);
        console.error('Error fetching room information:', error);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:3000/rooms/update/${roomId}`, room);
      console.log('update:', response);
      navigate('/hotelRooms');
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleCancel = () => {
    navigate('/hotelRooms');
  };

  const handleChange = (event) => {
    setRoom({ ...room, [event.target.name]: event.target.value });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '400px' }}>
    <div className="card-body">
      <h2 className="card-title text-center">Update Room</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Room kind:</label>
          <input
            type="text"
            className="form-control"
            name="kind"
            value={room.kind}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={room.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Number Available:</label>
          <input
            type="number"
            className="form-control"
            name="numberAvailable"
            value={room.numberAvailable}
            onChange={handleChange}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary me-2">
            Update
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);
  };

export default UpdateRoomPage;
