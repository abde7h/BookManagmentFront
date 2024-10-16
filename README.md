# Book Management Frontend

Este proyecto es un frontend desarrollado con **Vue.js** para la gestión de libros. La aplicación permite a los usuarios autenticarse, buscar libros a través de la **API de Google Books**, y gestionar una lista de libros favoritos. Utiliza **JWT (JSON Web Token)** para la autenticación.

## Características

- **Autenticación con JWT**: Registro e inicio de sesión de usuarios.
- **Búsqueda de libros**: Integración con la API de Google Books para buscar libros.
- **Gestión de favoritos**: Posibilidad de añadir y eliminar libros de la lista de favoritos.
- **Componentes modulares**: Utiliza componentes como `Login.vue`, `Register.vue`, `BookSearch.vue`, `BookList.vue`, `Profile.vue`, y `Header.vue`.
- **Interfaz amigable y responsive**: Mejoras para la UI/UX y compatibilidad con diferentes dispositivos.

## Requisitos

- Node.js 16+
- Vue 3
- Pinia (para la gestión del estado)
- Axios (para las solicitudes HTTP)

## Configuración

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/abde7h/BookManagementFrontend.git
   cd BookManagementFrontend
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Crear un archivo `.env` para configurar la URL del backend:
   ```env
   VUE_APP_API_URL=http://localhost:8081
   ```

## Enlace al Backend

El backend del proyecto se encuentra disponible en el siguiente enlace: [GestorGastosBack](https://github.com/abde7h/BookManagmentBack/tree/main/Book-managmentBack)

## Estructura de Componentes

### Componentes Principales

- **Login.vue y Register.vue**: Permiten al usuario registrarse e iniciar sesión. Al autenticarse, el usuario obtiene un token JWT almacenado en el local storage para autenticar las futuras solicitudes.
- **BookSearch.vue**: Utiliza la API de Google Books para buscar libros y mostrarlos al usuario, con la opción de añadirlos a su lista de favoritos.
- **BookList.vue**: Muestra los libros favoritos del usuario y permite eliminarlos de la lista.
- **Profile.vue**: Permite al usuario actualizar sus datos de perfil.
- **Header.vue y Footer.vue**: Componentes comunes para la navegación y el pie de página de la aplicación.

## Gestión del Estado

El proyecto utiliza **Pinia** como gestor de estado para manejar la información global como el estado de autenticación del usuario y la lista de libros favoritos.

- **userStore.js**: Almacena la información del usuario, gestiona el inicio y cierre de sesión, y almacena el token JWT.
- **booksStore.js**: Gestiona la lista de libros favoritos, incluyendo la búsqueda, añadir y eliminar libros.

## Endpoints del Backend

El proyecto se comunica con un backend desarrollado en Spring Boot disponible en `http://localhost:8081`. Los principales endpoints son:

- **/auth/register**: Registro de usuarios.
- **/auth/login**: Autenticación de usuarios.
- **/books/favorites**: Obtener, añadir o eliminar libros de la lista de favoritos.

## Ejecución

Para ejecutar la aplicación localmente:

1. Iniciar la aplicación:

   ```bash
   npm run serve
   ```

2. La aplicación estará disponible en `http://localhost:5173`.

## Navegación y Seguridad

- Después de iniciar sesión, el usuario es redirigido a la página principal y se muestran opciones adicionales en la barra de navegación (`Profile` y `Logout`).
- La aplicación asegura que las rutas protegidas solo sean accesibles si el usuario está autenticado. Se utiliza `beforeEach` en el enrutador para validar el acceso según el estado de autenticación.

## Notas adicionales

- La aplicación está configurada para permitir **CORS** y conectarse al backend desarrollado en Spring Boot para autenticación y gestión de datos.
- La interfaz de usuario se ha optimizado para ser intuitiva y accesible desde diferentes dispositivos.
