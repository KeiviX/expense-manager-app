from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, income, expenses
from .database import engine
from . import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(income.router)
app.include_router(expenses.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
