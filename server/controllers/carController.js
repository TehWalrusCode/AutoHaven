const Car = require('../models/Car'); // Import the Car model to interact with the car data in the database
const asyncHandler = require('express-async-handler'); // Middleware to handle asynchronous errors in express routes

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
exports.getCars = asyncHandler(async (req, res) => {
  // Optional pagination: defaults to page 1 and limit 10 if not provided in the query
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit; // Calculate how many records to skip for pagination

  // Fetch the list of cars from the database, with pagination
  const cars = await Car.find({})
    .skip(skip)  // Skip the first 'skip' records (for pagination)
    .limit(limit); // Limit the results to 'limit' number of cars

  // Respond with the list of cars, including pagination info
  res.status(200).json({
    success: true, // Indicating the request was successful
    count: cars.length, // The number of cars returned in the response
    pagination: {  // Include pagination data
      page,
      limit,
      total: await Car.countDocuments() // Total number of cars in the database
    },
    data: cars // The list of cars
  });
});

// @desc    Get a single car by ID
// @route   GET /api/cars/:id
// @access  Public
exports.getCar = asyncHandler(async (req, res) => {
  // Find a car by its ID from the request parameters
  const car = await Car.findById(req.params.id);
  
  if (!car) {
    res.status(404); // If car is not found, send a 404 response
    throw new Error('Car not found'); // Throw an error which will be caught by asyncHandler
  }

  // Respond with the car data
  res.status(200).json({
    success: true,
    data: car // The data of the car
  });
});

// @desc    Create a new car
// @route   POST /api/cars
// @access  Private/Admin
exports.createCar = asyncHandler(async (req, res) => {
  // Create a new car based on the data in the request body
  const car = await Car.create(req.body);
  
  // Respond with the created car data
  res.status(201).json({
    success: true, // Indicate successful creation
    data: car // The newly created car data
  });
});

// @desc    Update an existing car by ID
// @route   PUT /api/cars/:id
// @access  Private/Admin
exports.updateCar = asyncHandler(async (req, res) => {
  // Find and update the car by its ID with the new data from the request body
  const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return the updated car
    runValidators: true // Ensure validation rules are applied to the update
  });

  if (!car) {
    res.status(404); // If the car is not found, send a 404 response
    throw new Error('Car not found'); // Throw an error which will be caught by asyncHandler
  }

  // Respond with the updated car data
  res.status(200).json({
    success: true,
    data: car // The updated car data
  });
});

// @desc    Delete a car by ID
// @route   DELETE /api/cars/:id
// @access  Private/Admin
exports.deleteCar = asyncHandler(async (req, res) => {
  // Find the car by its ID and delete it
  const car = await Car.findByIdAndDelete(req.params.id);

  if (!car) {
    res.status(404); // If the car is not found, send a 404 response
    throw new Error('Car not found'); // Throw an error which will be caught by asyncHandler
  }

  // Respond with success message after deletion
  res.status(200).json({
    success: true, // Indicate the deletion was successful
    data: {} // No data to return, as the car has been deleted
  });
});
