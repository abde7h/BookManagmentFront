import axios from 'axios';

const API_URL = 'http://localhost:8081/books/';

class BookService {
  getFavoriteBooks() {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    return axios.get(API_URL + 'favorites', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  removeBook(bookId) {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    return axios.delete(API_URL + `remove/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  addBookToFavorites(book) {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    return axios.post(API_URL + 'add', book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  searchBooks(query) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  }
}

export default new BookService();
