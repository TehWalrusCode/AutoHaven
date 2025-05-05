import React from 'react';

// Footer component displays the footer section with relevant details.
const Footer = () => {
  return (
    // Main footer container with background color and padding
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          {/* First Column - Company Info */}
          <div className="col-md-6">
            <h5>AutoHaven</h5>
            <p>Your trusted source for quality pre-owned vehicles.</p>
          </div>

          {/* Second Column - Quick Links */}
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              {/* Navigation links to important pages */}
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/cars" className="text-white">Cars</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>

          {/* Third Column - Contact Information */}
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <address>
              {/* Address details */}
              <p>123 Car Street<br />Auto City, AC 12345</p>
              {/* Phone and Email */}
              <p>Phone: (123) 456-7890<br />Email: info@autohaven.com</p>
            </address>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="row">
          <div className="col text-center pt-3">
            {/* Dynamic copyright year */}
            <p>&copy; {new Date().getFullYear()} AutoHaven. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
