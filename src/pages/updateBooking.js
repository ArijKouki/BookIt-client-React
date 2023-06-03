import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBookingPage = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [booking, setBooking] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/bookings/booking/${bookingId}`);
        console.log('get booking:', response);
        setBooking(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching booking information');
        setIsLoading(false);
        console.error('Error fetching booking information:', error);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:3000/bookings/update/${bookingId}`, booking);
      console.log('update:', response);
      navigate('/bookings');
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleCancel = () => {
    navigate('/bookings');
  };

  const handleChange = (event) => {
    setBooking({ ...booking, [event.target.name]: event.target.value });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Update Booking</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Check-in Date:</label>
          <input
            type="date"
            name="checkInDate"
            value={booking.checkInDate ? booking.checkInDate.slice(0, 10) : ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Check-out Date:</label>
          <input
            type="date"
            name="checkOutDate"
            value={booking.checkOutDate ? booking.checkOutDate.slice(0, 10) : ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBookingPage;
