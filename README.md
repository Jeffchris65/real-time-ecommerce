# Real-Time E-commerce Platform

A modern e-commerce platform with real-time updates using Node.js, Express, React, and Socket.IO.

## Features

- Real-time product updates
- User authentication
- Shopping cart functionality
- Product catalog
- Order management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (optional - currently using in-memory storage)

## Setup Instructions

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd real-time-ecommerce
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

4. Create a .env file in the root directory:
   ```
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend server:
   ```bash
   # From the root directory
   npm run dev
   ```

6. Start the frontend development server:
   ```bash
   # From the client directory
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
real-time-ecommerce/
├── src/                    # Backend source files
│   ├── routes/            # API routes
│   └── server.js          # Main server file
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── redux/        # Redux store and slices
│   │   └── App.js        # Main React component
│   └── package.json      # Frontend dependencies
└── package.json          # Backend dependencies
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- POST /api/products - Create product (protected)
- PUT /api/products/:id - Update product (protected)
- DELETE /api/products/:id - Delete product (protected)

### Orders
- GET /api/orders - Get user orders
- POST /api/orders - Create order
- PATCH /api/orders/:id/status - Update order status
