import api from './api.service';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'employee';
    tenantId: string;
  };
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    // const response = await api.post<LoginResponse>('/auth/login', {
    //   email,
    //   password,
    //   tenantId: process.env.NEXT_PUBLIC_DEFAULT_TENANT,
    // });
    // return response.data;
    const dataResponse: LoginResponse = {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjExODc4My1kYjEzLTRkNjUtOGNiYi1kZjQwMGYwM2YxZWEiLCJyb2xlIjoiYWRtaW4iLCJ0ZW5hbnRJZCI6IjEzZDZjNjA4LTVhZmMtNDBhYS05ZTlmLTZmY2YwNjAwZDJjYSJ9.-FHXfI2I4fagfjD1RvxjxE4bNgcMlJWm38Xrp7Og0lg",
      user: {
        id: "5f118783-dc13-4d65-8cbb-df400f03f1ea",
        name: "Juan Pérez",
        email: "juan.perez@empresa.com",
        role: "admin",
        tenantId: "13d6c608-5afc-40aa-9e9f-6fcf0600d2ca"
      }
    }
    
    return dataResponse
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('authToken');
  },

  async resetPassword(email: string): Promise<void> {
    await api.post('/auth/reset-password', { email });
  },

  async register(payload: {
    name: string;
    email: string;
    password: string;
    company: string;
  }): Promise<void> {
    await api.post('/auth/register', {
      ...payload,
      tenantId: process.env.NEXT_PUBLIC_DEFAULT_TENANT,
    });
  },
};