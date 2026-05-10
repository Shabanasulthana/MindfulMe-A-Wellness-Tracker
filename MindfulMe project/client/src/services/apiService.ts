// services/apiService.ts
export const loginUser = async (credentials: { name: string; password: string }) => {
  try {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    if (res.ok) {
      return {
        success: true,
        user: {
          id: data.user_id,
          name: data.name,
          role: data.role,
        },
        token: data.token,
      };
    } else {
      return { success: false, message: data.message || 'Login failed' };
    }
  } catch (err) {
    return { success: false, message: 'Server error' };
  }
};


export const registerUser = async (data: { name: string, email: string, password: string }) => {
  try {
    const res = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    return { success: res.status === 200, message: json.message };
  } catch (error) {
    return { success: false, message: 'Registration failed.' };
  }
};

