<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0">
            <router-link to="/">
              <h1 class="text-2xl font-semibold">Gestión de Libros</h1>
            </router-link>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <router-link v-if="!isAuthenticated" to="/login" class="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</router-link>
              <router-link v-if="!isAuthenticated" to="/register" class="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</router-link>
              <router-link v-if="isAuthenticated" to="/profile" class="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</router-link>
              <button v-if="isAuthenticated" @click="logout" class="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from '../store/userStore';

export default {
  setup() {
    const userStore = useUserStore();

    const logout = () => {
      userStore.logout();
      window.location.href = '/';
    };

    return {
      isAuthenticated: userStore.isAuthenticated,
      logout,
    };
  },
};
</script>
