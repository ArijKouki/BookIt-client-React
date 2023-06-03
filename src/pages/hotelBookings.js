import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HotelBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/hotels/mine');
        console.log("bookings: ",response.data.data.bookings);
        setBookings(response.data.data.bookings);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching hotel bookings');
        setIsLoading(false);
        console.error('Error fetching hotel bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Booking ID: {booking.id}</h5>
            <p className="card-text">Check-in Date: {booking.checkInDate}</p>
            <p className="card-text">Check-out Date: {booking.checkOutDate}</p>
            <p className="card-text">Number of Rooms: {booking.numberOfRooms}</p>
            <p className="card-text">Cost: {booking.cost}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelBookings;
