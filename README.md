# Expense Tracker

A full-stack expense tracking application with user authentication, expense and income management, and detailed financial analytics.

## Tech Stack

### Frontend:
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Context API for state management
- Modern component architecture

### Backend:
- FastAPI (Python)
- SQLAlchemy ORM
- SQLite database
- JWT authentication
- Pydantic for data validation

## Project Structure

```
/
├── frontend/                # React TypeScript frontend
│   ├── src/
│   │   ├── api/            # API client and utilities
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React Context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   └── types/          # TypeScript type definitions
│   ├── package.json
│   └── tsconfig.json
├── backend/                # FastAPI Python backend
│   ├── app/
│   │   ├── models/         # Database models
│   │   ├── routers/        # API routes
│   │   ├── schemas/        # Pydantic schemas
│   │   └── main.py         # Application entry point
│   └── requirements.txt
└── README.md
```

## Features

### User Management
- User registration and authentication
- JWT-based session management
- Protected routes
- User profile management

### Expense Management
- Add, edit, and delete expenses
- Expense categorization
- Expense filtering and sorting
- Expense history

### Income Management
- Track multiple income sources
- Recurring income support
- Income categorization
- Income history

### Analytics
- Expense breakdown by category
- Income vs Expense analysis
- Monthly/yearly trends
- Interactive charts and graphs

### UI/UX
- Responsive design
- Modern user interface
- Smooth animations
- Dark mode support
- Loading states and error handling

## Getting Started

1. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

2. Set up the frontend:
```bash
cd frontend
npm install
npm start
```

The frontend will be available at http://localhost:3000
The backend API will be available at http://localhost:8000

## API Documentation

Once the backend is running, visit http://localhost:8000/docs for the interactive API documentation.

## Development

The project follows modern development practices:
- TypeScript for type safety
- Component-based architecture
- Context API for state management
- JWT authentication
- RESTful API design
- ORM for database operations
- Comprehensive error handling

## Environment Variables

Frontend:
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:8000)

Backend:
- `DATABASE_URL`: SQLite database URL
- `SECRET_KEY`: JWT secret key
- `ALGORITHM`: JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: JWT token expiration (default: 30)
