const mongoose = require('mongoose');

// Define the schema for the 'Car' model
const CarSchema = new mongoose.Schema({
  // The 'make' of the car (e.g., Toyota, Ford, etc.)
  make: {
    type: String, // The data type is a string
    required: true, // This field is required when creating a new car document
  },

  // The 'model' of the car (e.g., Camry, Mustang, etc.)
  model: {
    type: String, // The data type is a string
    required: true, // This field is required when creating a new car document
  },

  // The 'year' the car was manufactured
  year: {
    type: Number, // The data type is a number (e.g., 2020)
    required: true, // This field is required when creating a new car document
  },

  // The 'price' of the car
  price: {
    type: Number, // The data type is a number (e.g., 25000)
    required: true, // This field is required when creating a new car document
  },

  // The 'mileage' of the car (in kilometers or miles)
  mileage: {
    type: Number, // The data type is a number
    required: true, // This field is required when creating a new car document
  },

  // The type of fuel the car uses (e.g., Petrol, Diesel, Electric, etc.)
  fuelType: {
    type: String, // The data type is a string
    required: true, // This field is required when creating a new car document
  },

  // The transmission type of the car (e.g., Automatic, Manual, etc.)
  transmission: {
    type: String, // The data type is a string
    required: true, // This field is required when creating a new car document
  },

  // A URL to an image representing the car (e.g., a link to an image file)
  imageUrl: {
    type: String, // The data type is a string
    required: true, // This field is required when creating a new car document
  },

  // A description of the car (e.g., general information, condition, etc.)
  description: {
    type: String, // The data type is a string
    required: true, // This field is required when creating a new car document
  },

  // A list of features of the car (e.g., air conditioning, GPS, etc.)
  features: {
    type: [String], // The data type is an array of strings (features list)
    default: [], // If no features are provided, an empty array will be used by default
  },

  // A flag to indicate if the car is available for sale
  isAvailable: {
    type: Boolean, // The data type is a boolean (true or false)
    default: true, // The car is available by default when created
  },

  // The date when the car was added to the database
  createdAt: {
    type: Date, // The data type is a Date
    default: Date.now, // Automatically sets the current date and time when the car is created
  },
});

// Export the model so it can be used in other parts of the application
module.exports = mongoose.model('Car', CarSchema);
