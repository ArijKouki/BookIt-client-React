import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const hotelResponse = await axios.get(`http://localhost:3000/hotels/${hotelId}`);
        const roomResponse = await axios.get(`http://localhost:3000/hotels/rooms/${hotelId}`);
        console.log(roomResponse);

        const hotelData = hotelResponse.data.data;
        const roomData = roomResponse.data.data.rooms;

        if (hotelData) {
          setHotel(hotelData);
        } else {
          console.error('Invalid hotel data:', hotelData);
        }

        if (Array.isArray(roomData)) {
          setRooms(roomData);
        } else {
          console.error('Invalid room data:', roomData);
        }
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mb-4">
          <img
              src={`http://localhost:3000/images/${hotel.photo}`}
              alt={hotel.name}
              className="card-img-top"
              style={{ objectFit: 'cover' }}
            />
            <div className="card-body">
              <h3 className="card-title">{hotel.name}</h3>
              <p className="card-text">{hotel.address}</p>
              <p className="card-text">Stars: {hotel.stars}</p>
            </div>

          </div>
  
          <h4>These are the room options currently available</h4>

          <div className="row">
  {rooms.map((room) => (
    <div className="col-md-6" key={room.id}>
      <div className="card mb-3">
        <div className="col-md-12">
          <img
            src={`http://localhost:3000/images/${room.image}`}
            alt={room.image}
            className="card-img"
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{room.kind}</h5>
            <Link to={`/book/${room.id}`} className="btn btn-dark">Book</Link>
          </div>
          <p className="card-text">Price: {room.price}</p>
        </div>
      </div>
    </div>
  ))}
</div>



        </div>
      </div>
    </div>
  );
  
};

export default HotelDetails;
