import axios from 'axios';
const API_URL = 'http://localhost:8081/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        username: user.username,
        password: user.password,
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token); // Almacena solo el token
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      username: user.username,
      password: user.password,
    });
  }
}

// Configura un interceptor de axios para incluir el token en todas las solicitudes
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default new AuthService();
