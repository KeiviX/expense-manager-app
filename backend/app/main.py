from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, expenses, income
from . import models
from .database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Expense Tracker API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(expenses.router)
app.include_router(income.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Expense Tracker API"}
