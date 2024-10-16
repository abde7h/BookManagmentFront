<template>
    <div class="min-h-screen bg-gray-100 p-6">
      <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-6">Perfil de Usuario</h2>
        <form @submit.prevent="updateProfile">
          <label for="username" class="block text-gray-700">Usuario:</label>
          <input
            type="text"
            v-model="username"
            class="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
  
          <label for="password" class="block text-gray-700">Nueva Contraseña (opcional):</label>
          <input
            type="password"
            v-model="password"
            class="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
          <button
            type="submit"
            class="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Actualizar Perfil
          </button>
  
          <p v-if="success" class="text-green-500 text-center mt-4">{{ success }}</p>
          <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: null,
        success: null,
      };
    },
    async created() {
      await this.fetchProfile();
    },
    methods: {
      async fetchProfile() {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:8081/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          this.username = data.username;
        } catch (error) {
          this.error = 'Error al cargar el perfil';
        }
      },
      async updateProfile() {
        this.error = null;
        this.success = null;
  
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:8081/user/update', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password || undefined,  // No envía el campo si está vacío
            }),
          });
  
          if (!response.ok) {
            throw new Error('Error al actualizar el perfil');
          }
  
          this.success = 'Perfil actualizado con éxito';
        } catch (error) {
          this.error = 'Error al actualizar el perfil';
        }
      },
    },
  };
  </script>
  