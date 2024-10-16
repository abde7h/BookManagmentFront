<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Buscar Libros</h2>

    <!-- Mensajes de éxito o error -->
    <transition name="fade">
      <div
        v-if="notification.message"
        :class="notification.type"
        class="p-3 mb-4 rounded"
      >
        {{ notification.message }}
      </div>
    </transition>

    <div class="flex items-center mb-4">
      <input
        v-model="query"
        @keydown.enter="searchBooks"
        type="text"
        placeholder="Buscar libros..."
        class="border border-gray-300 p-2 rounded-l w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="searchBooks"
        class="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition-colors"
      >
        Buscar
      </button>
    </div>

    <div v-if="books.length === 0 && querySubmitted" class="text-gray-500">
      <p>No se encontraron libros para la búsqueda "{{ query }}".</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="book in books"
        :key="book.id"
        class="bg-white shadow-md rounded-lg p-4"
      >
        <h3 class="text-lg font-semibold">{{ book.volumeInfo.title }}</h3>
        <p class="text-sm text-gray-600">
          {{ book.volumeInfo.authors?.join(", ") }}
        </p>
        <button
          @click="addToFavorites(book)"
          class="bg-green-500 text-white px-3 py-1 rounded mt-2 hover:bg-green-600 transition-colors"
        >
          Añadir a Favoritos
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useBooksStore } from "../store/booksStore";
import BookService from "../services/BookService";

export default {
  setup() {
    const query = ref("");
    const books = ref([]);
    const querySubmitted = ref(false);
    const booksStore = useBooksStore();
    const notification = ref({ message: "", type: "" }); // Manejamos las notificaciones

    const searchBooks = async () => {
      if (!query.value) return;
      try {
        const response = await BookService.searchBooks(query.value);
        books.value = response.data.items || [];
        querySubmitted.value = true;
        if (books.value.length === 0) {
          showNotification(
            "No se encontraron libros.",
            "bg-yellow-500 text-white"
          );
        }
      } catch (error) {
        showNotification(
          "Error en la búsqueda de libros.",
          "bg-red-500 text-white"
        );
      }
    };

    const addToFavorites = async (book) => {
      try {
        await booksStore.addBookToFavorites(book);
        showNotification(
          "Libro añadido a favoritos.",
          "bg-green-500 text-white"
        );
      } catch (error) {
        showNotification(
          "Error al añadir libro a favoritos.",
          "bg-red-500 text-white"
        );
      }
    };

    const showNotification = (message, type) => {
      notification.value = { message, type };
      setTimeout(() => {
        notification.value.message = "";
      }, 3000);
    };

    return {
      query,
      books,
      querySubmitted,
      searchBooks,
      addToFavorites,
      notification,
    };
  },
};
</script>

<style scoped>
/* Animaciones para las notificaciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
