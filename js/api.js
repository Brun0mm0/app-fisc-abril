const api = axios.create({
  baseURL: 'http://130.130.2.53:9096',
  Headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config;
});

window.api = api; // Expose the api instance globally for debugging purposes