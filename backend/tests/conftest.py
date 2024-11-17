import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.models import Base, User
from app.database import get_db
from app.auth import get_password_hash, create_access_token

# Use in-memory SQLite for testing
SQLALCHEMY_DATABASE_URL = "sqlite://"

@pytest.fixture(scope="function")
def test_engine():
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    # Create all tables for each test
    Base.metadata.create_all(bind=engine)
    yield engine
    # Drop all tables after each test
    Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def db_session(test_engine):
    TestingSessionLocal = sessionmaker(bind=test_engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.rollback()
        session.close()

@pytest.fixture(scope="function")
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass  # Session cleanup is handled by db_session fixture
    
    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()

@pytest.fixture(scope="function")
def test_user(db_session):
    password = "testpassword123"
    hashed_password = get_password_hash(password)  # Use our password hashing function
    user = User(
        email="test@example.com",
        full_name="Test User",
        hashed_password=hashed_password,
        is_active=True
    )
    db_session.add(user)
    db_session.commit()
    return user

@pytest.fixture(scope="function")
def test_auth_headers(test_user):
    access_token = create_access_token(data={"sub": test_user.email})
    return {"Authorization": f"Bearer {access_token}"}
