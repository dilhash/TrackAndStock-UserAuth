# Backend User Authentication Microservice

This project is a backend microservice for user authentication, built using Node.js, Express, MongoDB, Passport.js, and Winston for logging.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Logging](#logging)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login
- Password hashing using bcrypt
- Authentication using Passport.js
- CORS support for cross-origin requests
- Structured logging using Winston

## Prerequisites

- Node.js (>=14.x.x)
- npm (>=6.x.x)
- MongoDB (>=4.x.x)

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT=4001
    DATABASE_URL=mongodb://localhost:27017/your-database-name
    SESSION_SECRET=your-session-secret
    FRONTEND_URL=http://localhost:4000
    ```

2. Create a `config.js` file in the root directory with the following content:

    ```javascript
    const dotenv = require('dotenv');
    dotenv.config();

    module.exports = {
        port: process.env.PORT || 4001,
        databaseUrl: process.env.DATABASE_URL,
        sessionSecret: process.env.SESSION_SECRET,
        frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4000'
    };
    ```

## Running the Application

1. Ensure MongoDB is running on your machine or update the `DATABASE_URL` in the `.env` file with your MongoDB connection string.

2. Start the server:

    ```bash
    node server.js
    ```

    You should see logs indicating the server has started and is connected to MongoDB.

## API Endpoints

### POST /auth/register

Register a new user.

- Request Body:
    ```json
    {
        "name": "User Name",
        "email": "user@example.com",
        "password": "userpassword"
    }
    ```

- Response:
    - Success: `201 Created`
    ```json
    {
        "message": "User registered successfully"
    }
    ```
    - Error: `400 Bad Request` or `500 Internal Server Error`
    ```json
    {
        "message": "Error message"
    }
    ```

### POST /auth/login

Login an existing user.

- Request Body:
    ```json
    {
        "email": "user@example.com",
        "password": "userpassword"
    }
    ```

- Response:
    - Success: `200 OK`
    ```json
    {
        "user": {
            "id": "user-id",
            "name": "User Name",
            "email": "user@example.com"
        }
    }
    ```
    - Error: `400 Bad Request` or `500 Internal Server Error`
    ```json
    {
        "message": "Error message"
    }
    ```

## Logging

Structured logs are generated using Winston and are saved to the `log/app.log` file. Logs include timestamps and log levels for better traceability.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
