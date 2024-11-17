const API_URL = 'http://localhost:8000/auth';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  full_name: string;
}

export const login = async (data: LoginData) => {
  const response = await fetch(`${API_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      username: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Login failed');
  }

  const result = await response.json();
  localStorage.setItem('token', result.access_token);
  return result;
};

export const register = async (data: RegisterData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Registration failed');
  }

  return response.json();
};
