import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/hotels/${hotelId}`);
        const responseData = response.data.data;

        if (responseData) {
          setHotel(responseData);
        } else {
          console.error('Invalid hotel data:', responseData);
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
    <div className="card mb-4">
    <div className="row g-0">
      <div className="col-md-4">
        <img
          src={`http://localhost:3000/images/${hotel.photo}`}
          alt={hotel.name}
          className="card-img"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h3 className="card-title">{hotel.name}</h3>
          <p className="card-text">{hotel.address}</p>
          <p className="card-text">Stars: {hotel.stars}</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default HotelDetails;
