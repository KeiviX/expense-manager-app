from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr
from .models import FrequencyType

class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: EmailStr | None = None

class ExpenseBase(BaseModel):
    amount: float
    description: str
    category: str
    date: datetime

class ExpenseCreate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class IncomeBase(BaseModel):
    amount: float
    description: str
    source: str
    date: datetime
    frequency: Optional[FrequencyType] = None
    is_recurring: bool = False

class IncomeCreate(IncomeBase):
    pass

class Income(IncomeBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
