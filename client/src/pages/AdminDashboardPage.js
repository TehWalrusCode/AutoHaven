import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  // State to hold list of cars
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true); // Loader indicator
  const [error, setError] = useState(null); // Error handling

  // Form state to add/edit car
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    imageUrl: '',
    description: '',
    features: '',
  });

  const [editing, setEditing] = useState(null); // ID of car being edited
  const [formErrors, setFormErrors] = useState({}); // Form validation errors
  const [formSubmitted, setFormSubmitted] = useState(false); // Success feedback

  // Fetch cars on component mount
  useEffect(() => {
    fetchCars();
  }, []);

  // Fetch cars from backend API
  const fetchCars = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/cars');
      if (data.success) {
        setCars(data.data);
      }
    } catch (error) {
      setError('Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  };

  // Handle input change in form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form before submit
  const validateForm = () => {
    const errors = {};
    if (!formData.make.trim()) errors.make = 'Make is required';
    if (!formData.model.trim()) errors.model = 'Model is required';
    if (!formData.year) errors.year = 'Year is required';
    if (!formData.price) errors.price = 'Price is required';
    if (!formData.mileage) errors.mileage = 'Mileage is required';
    if (!formData.fuelType.trim()) errors.fuelType = 'Fuel type is required';
    if (!formData.transmission.trim()) errors.transmission = 'Transmission is required';
    if (!formData.imageUrl.trim()) errors.imageUrl = 'Image URL is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    return errors;
  };

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);

      // Format features string to array
      const carData = {
        ...formData,
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
      };

      try {
        if (editing) {
          // Update existing car
          await axios.put(`/api/cars/${editing}`, carData);
        } else {
          // Add new car
          await axios.post('/api/cars', carData);
        }

        // Reset form after success
        setFormData({
          make: '',
          model: '',
          year: '',
          price: '',
          mileage: '',
          fuelType: '',
          transmission: '',
          imageUrl: '',
          description: '',
          features: '',
        });

        setEditing(null);
        setFormSubmitted(true);
        fetchCars(); // Refresh car list

        // Hide success message after 3 seconds
        setTimeout(() => setFormSubmitted(false), 3000);
      } catch (error) {
        setError('Failed to save car');
      } finally {
        setLoading(false);
      }
    }
  };

  // Populate form with car data for editing
  const handleEdit = (car) => {
    setEditing(car._id);
    setFormData({
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      fuelType: car.fuelType,
      transmission: car.transmission,
      imageUrl: car.imageUrl,
      description: car.description,
      features: car.features.join(', '), // Convert features to comma string
    });
  };

  // Delete car after confirmation
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        setLoading(true);
        await axios.delete(`/api/cars/${id}`);
        fetchCars(); // Refresh list
      } catch (error) {
        setError('Failed to delete car');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h1 className="mb-4">Admin Dashboard</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Form to Add/Edit Car */}
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{editing ? 'Edit Car' : 'Add New Car'}</h2>

          {/* Success Message */}
          {formSubmitted && (
            <div className="alert alert-success">
              Car {editing ? 'updated' : 'added'} successfully!
            </div>
          )}

          {/* Car Form */}
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Make, Model, Year */}
              {/* Input fields for car details with error feedback */}
              {/* Each input is validated and displays error message if invalid */}
              {/* ... (abbreviated here — already commented above for each group) */}
            </div>

            {/* Features & Description */}
            {/* ... */}

            {/* Submit & Cancel Buttons */}
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : editing ? 'Update Car' : 'Add Car'}
              </button>

              {/* Cancel button for edit mode */}
              {editing && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditing(null);
                    setFormData({
                      make: '',
                      model: '',
                      year: '',
                      price: '',
                      mileage: '',
                      fuelType: '',
                      transmission: '',
                      imageUrl: '',
                      description: '',
                      features: '',
                    });
                    setFormErrors({});
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Table to display all cars */}
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Manage Cars</h2>

          {/* Conditional display for loading, empty, or filled car list */}
          {loading && !editing ? (
            <div className="text-center py-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : cars.length === 0 ? (
            <div className="alert alert-info">No cars available. Add your first car above.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Make/Model</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Render car list rows */}
                  {cars.map((car) => (
                    <tr key={car._id}>
                      <td>
                        <img
                          src={car.imageUrl}
                          alt={`${car.make} ${car.model}`}
                          style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                        />
                      </td>
                      <td>{car.make} {car.model}</td>
                      <td>{car.year}</td>
                      <td>${car.price.toLocaleString()}</td>
                      <td>
                        {car.isAvailable ? (
                          <span className="badge bg-success">Available</span>
                        ) : (
                          <span className="badge bg-danger">Sold</span>
                        )}
                      </td>
                      <td>
                        {/* Action buttons: View, Edit, Delete */}
                        <div className="btn-group btn-group-sm">
                          <Link to={`/cars/${car._id}`} className="btn btn-outline-primary">
                            View
                          </Link>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => handleEdit(car)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(car._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
