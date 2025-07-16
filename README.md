# Portfolio Backend

Node.js/Express API server for Sanika Amle's portfolio website.

## Features
- Contact form handling
- Database integration with MongoDB
- RESTful API endpoints
- CORS configuration for frontend integration

## Setup
1. Install dependencies: `npm install`
2. Copy `env.example` to `.env` and configure your environment variables
3. Start the server: `npm start`
4. For development: `npm run dev`

## API Endpoints
- `GET /api/health` - Health check
- `POST /api/contact` - Submit contact form
- `POST /api/book-suggestion` - Submit book suggestion
- `POST /api/feedback` - Submit visitor feedback

## Environment Variables
- `MONGO_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Frontend domain for CORS
