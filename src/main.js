import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue'; 
import BookSearch from './components/BookSearch.vue';
import BookList from './components/BookList.vue';
import Profile from './components/Profile.vue';
import { useUserStore } from './store/userStore'; // Asegúrate de importar el store

const app = createApp(App);
const pinia = createPinia();

const routes = [
  { path: '/', component: BookSearch },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/favorites', component: BookList, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware para proteger rutas
router.beforeEach((to, from, next) => {
  const userStore = useUserStore(); // Debe estar definido después de la importación
  if (to.meta.requiresAuth && !userStore.user) { // Cambiado a user, ya que estás usando user en el state
    next('/login'); // Redirigir a la página de login si no está autenticado
  } else {
    next(); // Permitir la navegación
  }
});

app.use(pinia);
app.use(router);
app.mount('#app');
