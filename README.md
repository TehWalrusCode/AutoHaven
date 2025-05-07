# AutoHaven - Car Marketplace Web App

AutoHaven is a full-stack car marketplace application that enables users to browse, list, and inquire about cars with a smooth user experience. It uses React on the frontend and Node.js + Express on the backend. Images of the cars are fetched via an API, and dynamic data is handled via a RESTful server.

---

## 🚗 Features

### Frontend (React)
- **Responsive and dynamic UI**: Designed for both desktop and mobile views.
- **Real-time car listings**: Cars are dynamically loaded using APIs with images.
- **User authentication**: Functional registration and login forms styled using `registerStyle.css`.
- **React Router Navigation**: Page routing handled using `react-router-dom`.
- **Component-Based Architecture**: Components like Navbar, CarList, Footer, CarDetails, CarCard, etc., are used for modular development.
- **Search and Filtering**: Users can filter listings by make, model, or price.
- **Interactive Forms**: Real-time validation feedback and form controls.
- **Visual Enhancements**: Use of images, hover effects, and transitions to improve UX.
- **Reusable styles**: A dedicated `registerStyle.css` for auth-related pages and global styles.
- **API Integration**: Fetches car images and data from backend APIs and displays them with detail cards.
- **State Management**: Utilizes React's useState and useEffect for dynamic rendering.
- **Frontend folder structure**:
  - `components/`: UI pieces like CarCard, Header, Footer
  - `pages/`: Major routes like HomePage, Login, Register, Dashboard
  - `App.js`: Main entry for the React app
  - `public/index.html`: Root template

**Example Code (React Car Card Component):**
```jsx
function CarCard({ car }) {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} />
      <h2>{car.name}</h2>
      <p>Price: ${car.price}</p>
      <a href={`/cars/${car.id}`}>View Details</a>
    </div>
  );
}
```

### Backend (Node.js + Express)
- **Express REST API**: Serves car data to the frontend via `/api/cars`
- **Static File Serving**: Hosts static assets like car images from `/public/images`
- **CORS and Middleware**: Supports cross-origin requests, uses JSON middleware
- **File-Based Structure**:
  - `app.js`: Main server logic
  - `routes/`: Extendable for user auth, admin routes, etc.
  - `data/`: Stores local JSON data or seeding scripts (e.g., `cars.json`)
- **API Design**: RESTful routes for easy integration with frontend
- **Error Handling and Logging**: Basic middleware in place for request logging and error messages
- **Future expansion-ready**: Easily extendable to support MongoDB, user sessions, or token-based authentication
- **CORS Setup**: Allows cross-origin requests from the frontend during development

**Example Code (Express Route):**
```js
app.get('/api/cars', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Toyota Corolla',
      image: 'http://localhost:5000/images/corolla.jpg',
      price: 18000
    },
    {
      id: 2,
      name: 'Honda Civic',
      image: 'http://localhost:5000/images/civic.jpg',
      price: 20000
    }
  ]);
});
```

---

## 🗂️ Project Structure

```
AutoHaven/
├── backend/
│   ├── app.js                # Express server code
│   ├── routes/              # Future routes for auth, users, etc.
│   └── public/
│       └── images/          # Static images for car listings
├── frontend/
│   ├── src/
│   │   ├── App.js           # Main React App
│   │   ├── components/      # Navbar, CarList, Footer, CarDetails, etc.
│   │   └── pages/           # Login, Register, Dashboard, Home, etc.
│   ├── public/
│   │   └── index.html       # Root HTML template
│   ├── registerStyle.css    # Styling for registration/login forms
│   └── index.css            # Global app styles
├── package.json
└── README.md
```

---

## 📸 Screenshots

### Registration Page
![Registration Page](./frontend/public/images/register-preview.png)

### Car Listings
![Car Listings](./frontend/public/images/car-listings-preview.png)

### Home Page Overview
![Home Page](./frontend/public/images/homepage-preview.png)

### Car Detail View
![Car Detail](./frontend/public/images/cardetail-preview.png)

---

## ⚙️ How to Run

### Backend Setup
```bash
cd backend
npm install
node app.js
```

The backend will start at `http://localhost:5000`. It serves:
- API at `/api/cars`
- Static files at `/images/*`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

This runs the React frontend at `http://localhost:3000` and fetches data from the backend.

To build for production:
```bash
npm run build
```

---

## 🔗 API Example
```http
GET http://localhost:5000/api/cars
```
```json
[
  {
    "id": 1,
    "name": "Toyota Corolla",
    "image": "http://localhost:5000/images/corolla.jpg",
    "price": 18000
  },
  {
    "id": 2,
    "name": "Honda Civic",
    "image": "http://localhost:5000/images/civic.jpg",
    "price": 20000
  }
]
```

---

## 🧱 Built With
- React + React Router
- Node.js + Express
- Custom CSS
- REST APIs
- Postman (for API testing)
- Nodemon (for development backend hot reloads)

---

## 📌 Notes
- Backend hosts images or proxies external APIs for images.
- Frontend fetches car listing data and images from the backend using Axios/fetch.
- Built for scalability—authentication and databases can be added.
- Deployment-friendly: You can deploy the backend (Render, Railway) and frontend (Netlify, Vercel) separately.

---

## 🙌 Credits
Special thanks to:
- **Adam**
- **Luke**
- **Aronald**
- **Bernie**

For their ideas, support, and collaboration on this project.

---

## 📃 License
This project is open-source and available under the [MIT License](LICENSE).

