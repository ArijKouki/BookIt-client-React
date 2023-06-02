import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelCard from './HotelCard';
import { Link } from 'react-router-dom';


const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:3000/hotels/all');
        const responseData = response.data.data.hotels;
        console.log(responseData);

        if (Array.isArray(responseData)) {
          setHotels(responseData);
        } else {
          console.error('Invalid hotel data:', responseData);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="container">
      <h2 className="my-4">Hotel List</h2>
      <div className="row">
        {hotels?.map((hotel) => (
          <div className="col-md-4" key={hotel.id}>
             <Link key={hotel.id} to={`/hotelDetails/${hotel.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <HotelCard hotel={hotel} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
