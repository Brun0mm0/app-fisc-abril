const api = axios.create({
  baseURL: 'http://130.130.2.53:9096',
  // baseURL: 'https://reqres.in',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Inerceptor de respuesta
api.interceptors.response.use(
  response => response,
  error => {
    const mensaje = error.response?.data?.message || 'Error desconocido del servidor';
    const status = error.response?.status;

    // Puedes hacer cosas distintas dependiendo del status
    if(status === 401) {
      console.error('No autorizado:', mensaje);
      window.location.hash = '#/login';
    } else if (status === 403) {
      console.error('Prohibido:', mensaje);
    }

    // Emitir error para Alpine
    window.dispatchEvent(new CustomEvent('api-error', { detail: { mensaje, status } }));

    // Rechazar la promesa para seguir con la cadena de errores si es necesario
    return Promise.reject(error);
  }
)

window.api = api; // Expose the api instance globally for debugging purposes