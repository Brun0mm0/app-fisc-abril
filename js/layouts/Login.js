document.addEventListener('alpine:init', () => {
    Alpine.data('loginComponent', () => ({
      email: 'Bruno',
      password: 'Provenzano',
      error: '',
  
      async login() {
        if (this.email === 'Bruno' && this.password === 'Provenzano') {
          window.location.hash = '#/dashboard';
        } else {
          this.error = 'Credenciales incorrectas';
        }
      }
    }));
  });