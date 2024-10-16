import { defineStore } from 'pinia';
import AuthService from '../services/AuthService';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        token: null, // Añade el estado del token
        isAuthenticated: false, // Estado para verificar si el usuario está autenticado
    }),
    actions: {
        async login(username, password) {
            try {
                const userData = await AuthService.login({ username, password });
                this.user = userData; // Guarda los datos del usuario
                this.isAuthenticated = true; // Cambia el estado de autenticación
                this.setToken(userData.token); // Establece el token
            } catch (error) {
                throw new Error('Login failed');
            }
        },
        logout() {
            AuthService.logout();
            this.user = null; // Limpiar datos del usuario
            this.token = null; // Limpiar el token
            this.isAuthenticated = false; // Cambia el estado de autenticación
        },
        async register(username, password) {
            try {
                await AuthService.register({ username, password });
            } catch (error) {
                throw new Error('Registration failed');
            }
        },
        setToken(token) { // Añade el método setToken
            this.token = token;
        },
    },
});
