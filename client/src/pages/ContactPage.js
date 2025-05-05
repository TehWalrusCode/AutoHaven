import React, { useState } from 'react'; // Importing React and the useState hook
import axios from 'axios'; // Importing axios for making HTTP requests

const ContactPage = () => {
  // State to handle form data, submission status, error handling, and loading state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [status, setStatus] = useState({
    submitted: false, // Tracks if the form has been submitted
    error: false, // Tracks if an error occurred during submission
    message: '', // Message to be displayed after form submission
  });
  
  const [loading, setLoading] = useState(false); // Loading state to indicate when the form is being submitted

  // Handle form field changes and update the state with the new values
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the name and value from the input field
    setFormData({ ...formData, [name]: value }); // Update the form data state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    setLoading(true); // Set loading to true while the form is being submitted
    
    try {
      // Make an API POST request to send the contact form data
      const { data } = await axios.post('/api/contact', formData);
      
      if (data.success) {
        // If the request is successful, update the status to show success message
        setStatus({
          submitted: true,
          error: false,
          message: 'Your message has been sent. We will get back to you soon!',
        });
        // Reset the form fields after successful submission
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        // If there's an issue with the submission, update the status to show error
        setStatus({
          submitted: true,
          error: true,
          message: 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      // If an error occurs during the request, update the status to show error
      setStatus({
        submitted: true,
        error: true,
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setLoading(false); // Set loading to false once the submission is done (either success or failure)
    }
  };

  return (
    <div>
      <h1 className="mb-4">Contact Us</h1>
      
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">Get in Touch</h2>
              
              {/* Show submission status message if form has been submitted */}
              {status.submitted && (
                <div
                  className={`alert ${status.error ? 'alert-danger' : 'alert-success'}`}
                >
                  {status.message} {/* Display success or error message */}
                </div>
              )}
              
              {/* Contact form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange} // Call handleChange on input change
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading} // Disable the button while the form is being submitted
                >
                  {loading ? 'Sending...' : 'Send Message'} {/* Show sending text while loading */}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Location and business hours section */}
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">Our Location</h2>
              
              {/* Placeholder for map */}
              <div className="ratio ratio-16x9 mb-4">
                <div className="bg-light d-flex align-items-center justify-content-center">
                  <p className="text-muted">Map would be displayed here</p>
                </div>
              </div>
              
              {/* Address and contact information */}
              <h4>AutoHaven Motors</h4>
              <address>
                <p>
                  123 Car Street<br />
                  Auto City, AC 12345
                </p>
                <p>
                  <strong>Phone:</strong> (123) 456-7890<br />
                  <strong>Email:</strong> info@autohaven.com
                </p>
              </address>
              
              {/* Business hours */}
              <h4 className="mt-4">Business Hours</h4>
              <ul className="list-unstyled">
                <li>Monday - Friday: 9:00 AM - 8:00 PM</li>
                <li>Saturday: 10:00 AM - 6:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
