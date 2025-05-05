import React, { useState, useEffect } from 'react'; // Importing React and necessary hooks
import { useParams, Link } from 'react-router-dom'; // Importing hooks from react-router-dom
import axios from 'axios'; // Importing axios for making HTTP requests

const CarDetailPage = () => {
  const { id } = useParams(); // Get the car id from the URL parameters using useParams hook
  const [car, setCar] = useState(null); // State to store the car details
  const [loading, setLoading] = useState(true); // State to track the loading state
  const [error, setError] = useState(null); // State to track any errors during data fetching

  // useEffect hook to fetch car details when the component mounts or the `id` changes
  useEffect(() => {
    const fetchCar = async () => {
      try {
        // Fetch car details from the API using the car id
        const { data } = await axios.get(`/api/cars/${id}`);
        if (data.success) {
          setCar(data.data); // Update the car state if the request is successful
        }
      } catch (error) {
        setError('Failed to fetch car details. Please try again later.'); // Set error message in case of failure
      } finally {
        setLoading(false); // Set loading state to false after the request is complete (successful or not)
      }
    };

    fetchCar(); // Call the fetchCar function
  }, [id]); // Dependency array - re-run when the `id` parameter changes

  // Loading state: Show a loading spinner while the data is being fetched
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Error state: Show an error message if the data fetch fails
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  // Car not found: Show a message if no car details are found
  if (!car) {
    return (
      <div className="alert alert-warning" role="alert">
        Car not found. <Link to="/cars">Go back to car listings</Link>
      </div>
    );
  }

  // Car details page: Render the details of the car
  return (
    <div>
      {/* Back to Cars button */}
      <Link to="/cars" className="btn btn-outline-primary mb-4">
        Back to Cars
      </Link>

      {/* Car details card */}
      <div className="card mb-4">
        <div className="row g-0">
          <div className="col-md-6">
            {/* Car image */}
            <img
              src={car.imageUrl} // Car image URL
              className="img-fluid rounded-start"
              alt={`${car.year} ${car.make} ${car.model}`}
              style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title">
                {car.year} {car.make} {car.model} {/* Display car make, model, and year */}
              </h2>
              <h3 className="text-primary">${car.price.toLocaleString()}</h3> {/* Display price */}
              
              <div className="mb-3">
                {/* Car details (Transmission, Fuel type, Mileage) */}
                <span className="badge bg-secondary me-2">{car.transmission}</span>
                <span className="badge bg-secondary me-2">{car.fuelType}</span>
                <span className="badge bg-secondary">{car.mileage.toLocaleString()} miles</span>
              </div>
              
              <hr />
              
              <h4>Description</h4>
              <p className="card-text">{car.description}</p> {/* Car description */}
              
              <hr />
              
              <h4>Features</h4>
              <ul>
                {/* List all features of the car */}
                {car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              
              <div className="d-grid gap-2 mt-4">
                {/* Buttons for contacting the seller and scheduling a test drive */}
                <button className="btn btn-primary">Contact Seller</button>
                <button className="btn btn-outline-primary">Schedule Test Drive</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vehicle details section */}
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Vehicle Details</h4>
          <div className="row">
            <div className="col-md-6">
              <ul className="list-group list-group-flush">
                {/* List of additional car details like Make, Model, Year, Mileage */}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Make:</span>
                  <span className="fw-bold">{car.make}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Model:</span>
                  <span className="fw-bold">{car.model}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Year:</span>
                  <span className="fw-bold">{car.year}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Mileage:</span>
                  <span className="fw-bold">{car.mileage.toLocaleString()} miles</span>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="list-group list-group-flush">
                {/* Additional details like Fuel Type, Transmission, Availability, and Listing date */}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Fuel Type:</span>
                  <span className="fw-bold">{car.fuelType}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Transmission:</span>
                  <span className="fw-bold">{car.transmission}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Availability:</span>
                  <span className="fw-bold">
                    {car.isAvailable ? (
                      <span className="text-success">Available</span> // If the car is available
                    ) : (
                      <span className="text-danger">Sold</span> // If the car is sold
                    )}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Listed:</span>
                  <span className="fw-bold">
                    {new Date(car.createdAt).toLocaleDateString()} {/* Car listing date */}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
