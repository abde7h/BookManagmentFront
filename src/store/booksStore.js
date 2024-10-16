import { defineStore } from 'pinia';
import BookService from '../services/BookService'; // Verifica que esta ruta sea correcta

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [],
  }),
  actions: {
    async fetchFavoriteBooks() {
      try {
        const response = await BookService.getFavoriteBooks();
        this.books = response.data; // Ajusta según el formato de respuesta de la API
      } catch (error) {
        console.error('Error fetching favorite books', error);
      }
    },
    async removeBook(bookId) {
      try {
        await BookService.removeBook(bookId);
        this.books = this.books.filter(book => book.id !== bookId);
      } catch (error) {
        console.error('Error removing book', error);
      }
    },
    async addBookToFavorites(book) {
      try {
        await BookService.addBookToFavorites(book);
        this.books.push(book); // Añadir el libro a la lista local
      } catch (error) {
        console.error('Error adding book to favorites', error);
      }
    },
  },
});
