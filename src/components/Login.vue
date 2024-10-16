<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-6 text-center">Iniciar Sesión</h2>
          <form @submit.prevent="login">
              <label for="username" class="block text-gray-700">Usuario:</label>
              <input
                  type="text"
                  v-model="username"
                  class="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
              />
              <label for="password" class="block text-gray-700">Contraseña:</label>
              <input
                  type="password"
                  v-model="password"
                  class="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
              />
              <button
                  type="submit"
                  class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                  Iniciar Sesión
              </button>
              <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
              <p class="text-center mt-4">
                  ¿No tienes cuenta?
                  <router-link to="/register" class="text-blue-500 hover:underline">Regístrate aquí</router-link>
              </p>
          </form>
      </div>
  </div>
</template>

<script>
import { useUserStore } from '../store/userStore';

export default {
  data() {
      return {
          username: '',
          password: '',
          error: null,
      };
  },
  methods: {
      async login() {
          try {
              const response = await fetch('http://localhost:8081/auth/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      username: this.username,
                      password: this.password,
                  }),
              });
              if (!response.ok) {
                  const errorData = await response.text();
                  this.error = errorData;
                  return;
              }
              const data = await response.json();
              const userStore = useUserStore();
              userStore.setToken(data.token);
              localStorage.setItem('token', data.token);
              this.$router.push('/'); // Redirigir al home después del login exitoso
          } catch (error) {
              console.error("Error en el proceso de login:", error);
              this.error = 'Ocurrió un error en la autenticación';
          }
      },
  },
};
</script>
