from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import logging
from .. import models, schemas, auth
from ..database import get_db

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/income",
    tags=["income"]
)

@router.post("/", response_model=schemas.Income)
def create_income(
    income: schemas.IncomeCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    try:
        logger.info(f"Creating income entry for user {current_user.email}")
        db_income = models.Income(**income.dict(), user_id=current_user.id)
        db.add(db_income)
        db.commit()
        db.refresh(db_income)
        logger.info(f"Income entry created successfully")
        return db_income
    except Exception as e:
        logger.error(f"Error creating income: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not create income entry"
        )

@router.get("/", response_model=List[schemas.Income])
def read_incomes(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    try:
        logger.info(f"Fetching incomes for user {current_user.email}")
        incomes = db.query(models.Income).filter(
            models.Income.user_id == current_user.id
        ).offset(skip).limit(limit).all()
        logger.info(f"Successfully retrieved {len(incomes)} income entries")
        return incomes
    except Exception as e:
        logger.error(f"Error fetching incomes: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not fetch income entries"
        )

@router.get("/{income_id}", response_model=schemas.Income)
def read_income(
    income_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    try:
        logger.info(f"Fetching income {income_id} for user {current_user.email}")
        income = db.query(models.Income).filter(
            models.Income.id == income_id,
            models.Income.user_id == current_user.id
        ).first()
        if income is None:
            logger.warning(f"Income {income_id} not found")
            raise HTTPException(status_code=404, detail="Income not found")
        logger.info("Income entry retrieved successfully")
        return income
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching income: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not fetch income entry"
        )

@router.put("/{income_id}", response_model=schemas.Income)
def update_income(
    income_id: int,
    income: schemas.IncomeCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    try:
        logger.info(f"Updating income {income_id} for user {current_user.email}")
        db_income = db.query(models.Income).filter(
            models.Income.id == income_id,
            models.Income.user_id == current_user.id
        ).first()
        if db_income is None:
            logger.warning(f"Income {income_id} not found")
            raise HTTPException(status_code=404, detail="Income not found")
        
        for key, value in income.dict().items():
            setattr(db_income, key, value)
        
        db.commit()
        db.refresh(db_income)
        logger.info("Income entry updated successfully")
        return db_income
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating income: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not update income entry"
        )

@router.delete("/{income_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_income(
    income_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    try:
        logger.info(f"Deleting income {income_id} for user {current_user.email}")
        db_income = db.query(models.Income).filter(
            models.Income.id == income_id,
            models.Income.user_id == current_user.id
        ).first()
        if db_income is None:
            logger.warning(f"Income {income_id} not found")
            raise HTTPException(status_code=404, detail="Income not found")
        
        db.delete(db_income)
        db.commit()
        logger.info("Income entry deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting income: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not delete income entry"
        )
