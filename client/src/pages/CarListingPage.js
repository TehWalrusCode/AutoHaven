import React, { useState, useEffect } from 'react'; // Importing React and necessary hooks
import axios from 'axios'; // Importing axios for making HTTP requests
import CarCard from '../components/CarCard'; // Importing the CarCard component to display individual car details
import SearchFilter from '../components/SearchFilter'; // Importing the SearchFilter component to handle filtering logic

const CarListingPage = () => {
  // State for storing car data, loading state, error state, and filtered car results
  const [cars, setCars] = useState([]); // All cars data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state for handling API errors
  const [filteredCars, setFilteredCars] = useState([]); // State for filtered cars based on search criteria

  // useEffect hook to fetch the cars data from the API when the component mounts
  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Making API request to get all cars
        const { data } = await axios.get('api/cars');
        if (data.success) {
          setCars(data.data); // If the request is successful, set all cars data
          setFilteredCars(data.data); // Set the initial filtered cars to be the same as all cars
        }
      } catch (error) {
        // If there's an error, set an error message
        setError('Failed to fetch cars. Please try again later.');
      } finally {
        // Set loading state to false after fetching is done
        setLoading(false);
      }
    };

    fetchCars(); // Call the fetchCars function to get the data
  }, []); // Empty dependency array ensures that this runs only once on component mount

  // Handle search filter functionality
  const handleSearch = (filters) => {
    let results = [...cars]; // Copy of the cars array to filter

    // Apply filters based on user's search criteria
    if (filters.make) {
      results = results.filter(car =>
        car.make.toLowerCase().includes(filters.make.toLowerCase()) // Filter by make
      );
    }

    if (filters.priceMin) {
      results = results.filter(car => car.price >= Number(filters.priceMin)); // Filter by minimum price
    }

    if (filters.priceMax) {
      results = results.filter(car => car.price <= Number(filters.priceMax)); // Filter by maximum price
    }

    if (filters.yearMin) {
      results = results.filter(car => car.year >= Number(filters.yearMin)); // Filter by minimum year
    }

    if (filters.yearMax) {
      results = results.filter(car => car.year <= Number(filters.yearMax)); // Filter by maximum year
    }

    // Update the state with the filtered results
    setFilteredCars(results);
  };

  // If loading, show the loading spinner
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If there is an error, display the error message
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <h1 className="mb-4">Available Cars</h1>
      
      {/* Search filter component */}
      <SearchFilter onSearch={handleSearch} />
      
      {/* If no cars match the search criteria, display a message */}
      {filteredCars.length === 0 ? (
        <div className="alert alert-info">
          No cars match your search criteria. Please try different filters.
        </div>
      ) : (
        // Display filtered cars in a responsive grid layout
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredCars.map((car) => (
            <div className="col" key={car._id}>
              {/* Render a CarCard component for each car in the filtered list */}
              <CarCard car={car} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarListingPage;
