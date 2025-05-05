import React from 'react';
import { Link } from 'react-router-dom';

// CarCard component displays individual car details within a card
const CarCard = ({ car }) => {
  return (
    <div className="card h-100 shadow-sm">
      {/* Image of the car */}
      <img
        // The image source is dynamic, coming from the car object
        src={car.imageUrl}
        // Alt text describes the car (year, make, and model)
        className="card-img-top"
        alt={`${car.year} ${car.make} ${car.model}`}
        // Styling for the image to ensure it fits well within the card
        style={{ height: '200px', objectFit: 'cover' }}
      />
      
      <div className="card-body">
        {/* Car title displaying year, make, and model */}
        <h5 className="card-title">
          {car.year} {car.make} {car.model}
        </h5>

        {/* Price and mileage displayed in a flex container to align them */}
        <div className="d-flex justify-content-between mb-3">
          {/* Car price formatted with commas for readability */}
          <span className="h5 text-primary">${car.price.toLocaleString()}</span>
          {/* Car mileage formatted with commas for readability */}
          <span className="text-muted">{car.mileage.toLocaleString()} miles</span>
        </div>

        {/* Tags for transmission and fuel type */}
        <div className="mb-3">
          <span className="badge bg-secondary me-2">{car.transmission}</span>
          <span className="badge bg-secondary">{car.fuelType}</span>
        </div>

        {/* Car description with truncation for longer text */}
        <p className="card-text text-truncate">{car.description}</p>
      </div>

      {/* Card footer with a button linking to the detailed car page */}
      <div className="card-footer bg-white">
        <Link to={`/cars/${car._id}`} className="btn btn-primary w-100">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
