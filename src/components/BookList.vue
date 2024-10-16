<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Mis Libros Favoritos</h2>
    <transition name="fade">
      <div v-if="notification.message" :class="notification.type" class="p-3 mb-4 rounded">
        {{ notification.message }}
      </div>
    </transition>
    <div v-if="books.length === 0">
      <p>No tienes libros en tu lista de favoritos.</p>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="book in books" :key="book.id" class="bg-white shadow-md rounded-lg p-4">
        <h3 class="text-lg font-semibold">{{ book.title }}</h3>
        <p class="text-sm text-gray-600">{{ book.author }}</p>
        <button @click="removeBook(book.id)" class="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600 transition-colors">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useBooksStore } from '../store/booksStore';
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const booksStore = useBooksStore();
    const notification = ref({ message: '', type: '' });

    onMounted(async () => {
      await booksStore.fetchFavoriteBooks();
    });

    const removeBook = async (bookId) => {
      try {
        await booksStore.removeBook(bookId);
        showNotification('Libro eliminado de favoritos.', 'bg-green-500 text-white');
      } catch (error) {
        showNotification('Error al eliminar el libro.', 'bg-red-500 text-white');
      }
    };

    const showNotification = (message, type) => {
      notification.value = { message, type };
      setTimeout(() => {
        notification.value.message = '';
      }, 3000);
    };

    return {
      books: booksStore.books,
      removeBook,
      notification,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
