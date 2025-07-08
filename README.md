# Al-Farabi Frontend

Frontend application for Al-Farabi School's student registration system.

## Overview

This application provides a complete student registration system for Al-Farabi School, including:

- User registration and authentication
- Student biodata form submission
- Parent information form submission
- Document upload functionality
- Registration status checking
- Registration progress timeline

## Technologies

- Vue 3
- Vite
- Pinia for state management
- Tailwind CSS for styling

## Environment Setup

The application uses environment variables to configure API endpoints:

- Development: API calls are proxied through Vite's development server
- Production: API calls go directly to the backend API server

### Environment Files

- `.env.development` - Development environment settings
- `.env.production` - Production environment settings

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## API Configuration

The application connects to the Al-Farabi backend API. API base URL is configured via environment variables:

- `VITE_API_URL` - Base URL for API requests

## Deployment

The application is deployed at [https://al-farabi.walver.dev](https://al-farabi.walver.dev)
