document.addEventListener('alpine:init', () => {
    Alpine.data('loginComponent', () => ({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
      error: '',
  
      async login() {
        if (this.email === 'eve.holt@reqres.in' && this.password === 'cityslicka') {
          const alpineAuth = Alpine.store('auth');
          await alpineAuth.login(this.email, this.password);
          window.location.hash = '#/dashboard/procesar-archivo';
        } else {
          this.error = 'Credenciales incorrectas';
        }
      }
    }));
  });