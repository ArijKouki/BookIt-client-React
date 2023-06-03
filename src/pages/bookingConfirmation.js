import React, { useState, useEffect } from 'react';
import { useLocation, useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingConfirmation = () => {
  const location = useLocation();
  const { roomId } = useParams();
  const bookingDetails = location.state;
  const navigate = useNavigate();


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [creditCard, setCreditCard] = useState({
    number: '',
    cvv: '',
    expiryDate: ''
  });



  useEffect(() => {
    const fetchCreditCardDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/me');
        console.log(response);
        const creditCardDetails = response.data.data.user.creditCardDetails;

        if (creditCardDetails) {
          setCreditCard(creditCardDetails);
        }
      } catch (error) {
        console.error('Error fetching credit card details:', error);
      }
    };

    fetchCreditCardDetails();
  }, []);



  const handleChange = (e) => {
    setCreditCard({ ...creditCard, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.put('http://localhost:3000/users/me/update/credit-card-details', creditCard);
      console.log("creditCard: ",response);
    } catch (error) {
      setErrorMessage('Error updating credit card details');
      console.error('Error updating credit card details:', error);
    }

    try {
        console.log(bookingDetails);
        const response = await axios.post(`http://localhost:3000/bookings/new`, bookingDetails);
        console.log("booking: ",response);
        navigate('/bookings');
      } catch (error) {
        setErrorMessage('Error making a booking');
        console.error('Error making a booking:', error);
      }

    setIsSubmitting(false);
  };

  return (
    <div className="container">
      <h1>Booking Confirmation</h1>
      <p>Please provide or confirm your credit card details to confirm your booking.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="number">Credit Card Number:</label>
          <input
            type="text"
            id="number"
            name="number"
            className="form-control"
            value={creditCard.number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cvv">CVV/CVC:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            className="form-control"
            value={creditCard.cvv}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            className="form-control"
            value={creditCard.expiryDate}
            onChange={handleChange}
            required
          />
        </div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingConfirmation;
