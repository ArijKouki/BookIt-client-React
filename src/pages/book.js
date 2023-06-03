import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [bookingDetails, setBookingDetails] = useState({
    roomId: roomId,
    checkInDate: '',
    checkOutDate: '',
    numberOfRooms: 0
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    navigate(`/bookingConfirmation/${roomId}`, { state: bookingDetails });
  };

  const handleInputChange = (e) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <h2>Book Room</h2>
      <form onSubmit={handleBookingSubmit}>
        <div className="form-group">
          <label htmlFor="checkInDate">Check-in Date:</label>
          <input
            type="date"
            className="form-control"
            id="checkInDate"
            name="checkInDate"
            value={bookingDetails.checkInDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="checkOutDate">Check-out Date:</label>
          <input
            type="date"
            className="form-control"
            id="checkOutDate"
            name="checkOutDate"
            value={bookingDetails.checkOutDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfRooms">Number of Rooms:</label>
          <input
            type="number"
            className="form-control"
            id="numberOfRooms"
            name="numberOfRooms"
            value={bookingDetails.numberOfRooms}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark">
          Book
        </button>
      </form>
    </div>
  );
};

export default BookRoom;
