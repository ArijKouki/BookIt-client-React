import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/bookings');
        console.log(response);
        setBookings(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching user bookings');
        setIsLoading(false);
        console.error('Error fetching user bookings:', error);
      }
    };

    fetchUserBookings();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div className="col-md-4 mb-4" key={booking.id}>
              <div className="card">
              <img
            src={`http://localhost:3000/images/${booking.room.image}`}
            alt={booking.room.image}
            className="card-img"
            style={{ objectFit: 'cover', width: '100%' }}
          />
                <div className="card-body">
                  <h4 className="card-title">{booking.hotel.name}</h4>
                  <h5 className="card-title">{booking.room.kind}</h5>
                  <p className="card-text">Check-in: {booking.checkInDate}</p>
                  <p className="card-text">Check-out: {booking.checkOutDate}</p>
                  <p className="card-text">Number of Rooms: {booking.numberOfRooms}</p>
                  <p className="card-text">Cost: {booking.cost}</p>
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <Link to={`/updateBooking/${booking.id}`} className="btn btn-success mx-2">Update</Link>
                    <Link to={`/deleteBooking/${booking.id}`} className="btn btn-danger mx-2">Delete</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;
