document.addEventListener('alpine:init', () => {
  Alpine.data('dashboardComponent', () => ({
    subview: '',

    async init() {
      const section = this.getSectionFromHash();
      await this.loadSubview(section);

      window.addEventListener('hashchange', async () => {
        const section = this.getSectionFromHash();
        await this.loadSubview(section);
      });
    },

    getSectionFromHash() {
      const [, section] = window.location.hash.split('/dashboard/');
      return section || 'usuarios'; // valor por defecto
    },

    async navigate(section) {
      window.location.hash = `#/dashboard/${section}`;
    },

    async loadSubview(section) {
      const container = document.querySelector('.content');

      try {
        const res = await fetch(`/js/components/templates/${section}.template.html`);
        const html = await res.text();

        container.innerHTML = html; // ✅ Volcar el contenido en el DOM
        this.subview = html; // Opcional, si querés conservarlo en estado

        // insertar scripts
        const scriptUrl = `/js/components/scripts/${section}.js`; // corregí el path con `/` inicial
        if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
          const script = document.createElement('script');
          script.src = scriptUrl;
          script.defer = true;
          document.body.appendChild(script);
        }

      } catch (err) {
        console.error(err);
        container.innerHTML = `<h2 class="text-danger">Sección no encontrada</h2>`; // ✅ mensaje visible
      }
    },

    async logout() {
      const alpineAuth = Alpine.store('auth');
      alpineAuth.logout();
    },
  }));
});