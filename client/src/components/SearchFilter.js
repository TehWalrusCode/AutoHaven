import React, { useState } from 'react'; // Importing React and useState hook

const SearchFilter = ({ onSearch }) => {
  // State to hold the values for the filter criteria: make, price range, and year range
  const [filters, setFilters] = useState({
    make: '',        // Car make (e.g., "Toyota", "Ford")
    priceMin: '',    // Minimum price
    priceMax: '',    // Maximum price
    yearMin: '',     // Minimum year
    yearMax: '',     // Maximum year
  });

  // Handles changes in any of the filter input fields
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setFilters({ ...filters, [name]: value }); // Update the corresponding filter state
  };

  // Handles form submission and passes the filter criteria to the parent component (onSearch)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page on submit
    onSearch(filters); // Call the onSearch function passed from the parent component with the current filters
  };

  return (
    <div className="card mb-4"> {/* Card component to contain the search filter form */}
      <div className="card-body">
        <h5 className="card-title">Search Cars</h5> {/* Title of the filter section */}
        
        {/* Search form that submits the filter criteria */}
        <form onSubmit={handleSubmit}>
          <div className="row g-3"> {/* Bootstrap grid layout for the filter inputs */}
            
            {/* Input for car make */}
            <div className="col-md-4">
              <label htmlFor="make" className="form-label">Make</label>
              <input
                type="text"
                className="form-control"
                id="make"
                name="make"
                value={filters.make} // Controlled input, the value comes from state
                onChange={handleChange} // On change, update the state with the new value
                placeholder="Any make" // Placeholder text when no value is entered
              />
            </div>

            {/* Input for minimum price */}
            <div className="col-md-4">
              <label htmlFor="priceMin" className="form-label">Min Price</label>
              <input
                type="number"
                className="form-control"
                id="priceMin"
                name="priceMin"
                value={filters.priceMin}
                onChange={handleChange}
                placeholder="Min price"
              />
            </div>

            {/* Input for maximum price */}
            <div className="col-md-4">
              <label htmlFor="priceMax" className="form-label">Max Price</label>
              <input
                type="number"
                className="form-control"
                id="priceMax"
                name="priceMax"
                value={filters.priceMax}
                onChange={handleChange}
                placeholder="Max price"
              />
            </div>

            {/* Input for minimum year */}
            <div className="col-md-4">
              <label htmlFor="yearMin" className="form-label">Min Year</label>
              <input
                type="number"
                className="form-control"
                id="yearMin"
                name="yearMin"
                value={filters.yearMin}
                onChange={handleChange}
                placeholder="Min year"
              />
            </div>

            {/* Input for maximum year */}
            <div className="col-md-4">
              <label htmlFor="yearMax" className="form-label">Max Year</label>
              <input
                type="number"
                className="form-control"
                id="yearMax"
                name="yearMax"
                value={filters.yearMax}
                onChange={handleChange}
                placeholder="Max year"
              />
            </div>

            {/* Submit button for the form */}
            <div className="col-md-4 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchFilter;
