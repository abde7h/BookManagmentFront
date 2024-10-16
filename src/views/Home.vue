<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <h1 class="text-4xl font-bold mb-8">Gestión de Libros Favoritos</h1>

    <div v-if="showLogin">
      <Login @toggle="toggleForm" />
    </div>
    <div v-else>
      <Register @toggle="toggleForm" />
    </div>

    <button @click="toggleForm" class="mt-4 text-blue-500 hover:underline">
      {{
        showLogin
          ? "¿No tienes cuenta? Regístrate aquí"
          : "¿Ya tienes cuenta? Inicia sesión aquí"
      }}
    </button>
  </div>
</template>

<script>
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";

export default {
  components: {
    Register,
    Login,
  },
  data() {
    return {
      showLogin: true, // Inicialmente mostramos el formulario de Login
    };
  },
  methods: {
    toggleForm() {
      this.showLogin = !this.showLogin; // Alternar entre Login y Register
    },
  },
};
</script>

<style scoped>
/* Aquí puedes añadir estilos específicos para la vista si lo necesitas */
</style>
