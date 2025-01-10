# Real-Time E-commerce Platform

A modern e-commerce platform built with React and Node.js, featuring real-time updates using Socket.IO.

## Features

- Real-time product updates
- User authentication
- Shopping cart functionality
- Product search and filtering
- Responsive design
- Premium UI/UX inspired by Amazon

## Tech Stack

### Frontend
- React
- Redux Toolkit
- Styled Components
- Socket.IO Client
- React Router DOM

### Backend
- Node.js
- Express
- Socket.IO
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js >= 14.0.0
- npm >= 6.14.0

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/real-time-ecommerce.git
cd real-time-ecommerce
```

2. Install backend dependencies
```bash
npm install
```

3. Install frontend dependencies
```bash
cd client
npm install
```

4. Create .env file in root directory
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

5. Create .env file in client directory
```
REACT_APP_API_URL=http://localhost:5000
```

### Running the Application

1. Start the backend server
```bash
npm run dev
```

2. Start the frontend application
```bash
cd client
npm start
```

## Deployment

- Frontend: Deployed on Vercel
- Backend: Deployed on Render
- Database: MongoDB Atlas

## License

ISC
