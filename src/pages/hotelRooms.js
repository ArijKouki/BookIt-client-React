import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HotelRooms = () => {
  const [hotelRooms, setHotelRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHotelRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/hotels/mine');
        console.log("rooms: ",response.data.data.rooms);
        setHotelRooms(response.data.data.rooms);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching hotel rooms');
        setIsLoading(false);
        console.error('Error fetching hotel rooms:', error);
      }
    };

    fetchHotelRooms();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
    <div className="row justify-content-center">
      {hotelRooms.map((room) => (
        <div className="col-md-4 mb-3" key={room.id}>
          <div className="card">
            <img
              src={room.image?`http://localhost:3000/images/${room.image}`:"http://localhost:3000/images/default-room.jpg"}
              alt={room.image}
              className="card-img-top"
              style={{ objectFit: 'cover', height: '200px' }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{room.kind}</h5>
              <p className="card-text">Price: {room.price}</p>
              <p className="card-text">Available: {room.numberAvailable}</p>
              <div className="d-flex justify-content-center align-items-center mt-3">
                    <Link to={`/updateRoom/${room.id}`} className="btn btn-success mx-2">Update</Link>
                    <Link to={`/deleteRoom/${room.id}`} className="btn btn-danger mx-2">Delete</Link>
                  </div>
            </div>
          </div>
        </div>
        ))}
        </div>
        <div className="d-flex justify-content-center mt-3">
    <Link to={`/addRoom`} className="btn btn-primary">Add A Room</Link>
    </div>  
    </div>   
  );
};

export default HotelRooms;
