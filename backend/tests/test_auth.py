from fastapi import status
from urllib.parse import urlencode

def test_create_user(client):
    response = client.post(
        "/auth/register",
        json={
            "email": "newuser@example.com",
            "password": "testpass123",
            "full_name": "New User"
        }
    )
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["email"] == "newuser@example.com"
    assert data["full_name"] == "New User"
    assert "id" in data

def test_login_user(client, test_user):
    # Use application/x-www-form-urlencoded format for OAuth2 form data
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {
        "username": "test@example.com",
        "password": "testpassword123",  # This matches the hashed password in conftest.py
        "grant_type": "password"  # Required for OAuth2
    }
    response = client.post(
        "/auth/token",
        data=data  # FastAPI's TestClient handles form encoding automatically
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_get_current_user(client, test_auth_headers):
    response = client.get("/auth/me", headers=test_auth_headers)
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["full_name"] == "Test User"
