# Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js), featuring user authentication, post management, and commenting system.

## Prerequisites

Before you begin, ensure you have installed:
- Node.js
- MongoDB (running locally though docker or have a MongoDB Atlas account)
- npm package manager

## Project Structure

```
blog-application/
├── client/                 # Frontend React application
├── server/                 # Backend Node.js application
│   ├── db/                # Database models and connection
│   ├── routes/            # API routes
│   ├── authMiddleware.js  # Authentication middleware
│   └── index.js          # Server entry point
└── README.md              # This file
```

## Getting Started

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   ATLAS_URI=mongodb://localhost:27017
   PORT=5050
   JWT_SECRET=your-secret
   CLIENT_URL=https://frontend-url.here.com
   ```

4. Start the server:
   ```bash
   node index.js
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Main Features

### Backend (completed)

- **User Authentication**
  - JWT-based authentication
  - Secure password handling
  - Protected routes

- **Blog Post Management**
  - Create, read, update, and delete posts
  - Comment functionality
  - User-specific post management

### Frontend (yet to be built)

- **Modern UI with Tailwind CSS**
  - Responsive design
  - Clean and intuitive interface

- **Routing**
  - React Router for navigation
  - Protected routes for authenticated users

## Development Notes

### Environment Variables

The server requires the following environment variables:
- `ATLAS_URI`: MongoDB connection string
- `PORT`: Server port number
- `JWT_SECRET`: Secret key for JWT token generation
- `CLIENT_URL`: Frontend application URL

### Common Issues

1. MongoDB Connection:
   - I used docker to run locally. MongoDB Atlas also works fine.
   - Check connection string in `.env`

2. Authentication Issues:
   - Verify JWT_SECRET is properly set
   - Check token expiration settings

## Security Considerations

1. The `.env` file contains sensitive information and is included in `.gitignore`
2. JWT tokens are used for secure authentication
3. CORS is configured to accept requests only from the specified CLIENT_URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### PS: Still wrapping up a basic UI.



