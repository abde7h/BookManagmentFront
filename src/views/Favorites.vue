<template>
    <div class="p-6 bg-gray-100 min-h-screen">
      <h2 class="text-3xl font-bold mb-4">Mis Libros Favoritos</h2>
  
      <!-- Componente de búsqueda de libros -->
      <BookSearch />
  
      <!-- Componente de lista de libros favoritos -->
      <BookList />
    </div>
  </template>
  
  <script>
  import BookSearch from '../components/BookSearch.vue';
  import BookList from '../components/BookList.vue';
  
  export default {
    components: {
      BookSearch,
      BookList,
    },
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales para la vista de favoritos */
  </style>
  