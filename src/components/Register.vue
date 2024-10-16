<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-6 text-center">Registro</h2>
        <form @submit.prevent="register">
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
  
          <label for="confirmPassword" class="block text-gray-700">Confirmar Contraseña:</label>
          <input
            type="password"
            v-model="confirmPassword"
            class="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
  
          <button
            type="submit"
            class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Registrarse
          </button>
  
          <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
          <p v-if="success" class="text-green-500 text-center mt-4">{{ success }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        error: null,
        success: null,
      };
    },
    setup() {
      const router = useRouter(); // Para redireccionar
      return { router };
    },
    methods: {
      async register() {
        this.error = null;
        this.success = null;
  
        if (this.password !== this.confirmPassword) {
          this.error = 'Las contraseñas no coinciden';
          return;
        }
  
        try {
          const response = await fetch('http://localhost:8081/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
            }),
          });
  
          if (!response.ok) {
            throw new Error('Error en el registro');
          }
  
          this.success = 'Registro exitoso. Ahora puedes iniciar sesión.';
          
          // Redirigir al usuario a la página de inicio de sesión
          setTimeout(() => {
            this.router.push('/login');
          }, 2000); // Espera 2 segundos antes de redirigir
  
          // Limpiar los campos
          this.username = '';
          this.password = '';
          this.confirmPassword = '';
        } catch (error) {
          this.error = 'Error al registrar el usuario. Intenta de nuevo.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para Register.vue */
  </style>
  