document.addEventListener('alpine:init', () => {
  Alpine.data('dashboardComponent', () => ({

    async init() {
      const section = this.getSectionFromHash();

      const scriptUrl = `/js/components/scripts/${section}.js`; // corregí el path con `/` inicial

      await this.loadScript(scriptUrl); // ✅ Cargar el script correspondiente
      await this.loadSubview(section); // ✅ Cargar la vista correspondiente
      // insertar scripts
      // if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
      //   await new Promise((resolve, reject) => {
      //     const script = document.createElement('script');
      //     script.src = scriptUrl;
      //     script.defer = true;
      //     script.onload = resolve;
      //     script.onerror = reject;
      //     document.body.appendChild(script);
      //   })
      // }

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

      const res = await fetch(`/js/components/templates/${section}.template.html`);
      const html = await res.text();
      
      const container = document.querySelector('.content');
      container.innerHTML = html; // ✅ Volcar el contenido en el DOM

      // await this.loadScript(`/js/components/scripts/${section}.js`); // ✅ Cargar el script correspondiente

        Alpine.initTree(container); // ✅ Inicializar Alpine en el nuevo contenido
    },

    loadScript(scriptUrl) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    },

    async logout() {
      const alpineAuth = Alpine.store('auth');
      alpineAuth.logout();
    },
  }));
});