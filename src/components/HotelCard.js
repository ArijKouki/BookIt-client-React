import React from 'react';

const HotelCard = ({ hotel }) => {
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

export default HotelCard;
