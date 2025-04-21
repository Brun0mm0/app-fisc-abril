document.addEventListener('alpine:init', () => {
    Alpine.data('loginComponent', () => ({
      email: 'bprovenzano',
      password: 'XEWj$)=[=~OY',
      error: false,
      processing: false,
  
      async login() {
        // await alpineAuth.login(this.email, this.password)
        localStorage.setItem('user', JSON.stringify({ user: 'dev', roles: ['admin'] }))
        window.location.hash = '#/dashboard/procesar-archivo';
        // if(this.processing) return; // Evita múltiples envíos

        //   this.processing = true;

        //   try {
        //     const alpineAuth = Alpine.store('auth');
        //     await alpineAuth.login(this.email, this.password)
        //     window.location.hash = '#/dashboard/procesar-archivo';
        //   } catch (error) {
        //     this.error = true;
        //     // throw
        //     window.dispatchEvent(new CustomEvent('api-error', { detail: { mensaje: 'Error de autenticación', status: 401 } }));
        //     // console.error('Error de autenticación:', error);
        //   } finally {
        //     this.processing = false;
        //   }
        },

        limpiarError() {
          this.error = false;
        },
    }));
  });