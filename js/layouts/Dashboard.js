document.addEventListener('alpine:init', () => {
    Alpine.data('dashboardComponent', () => ({
      section: '',
  
      init() {
        this.loadView('home');
      },
  
      async loadView(view) {
        const res = await fetch(`/templates/dashboard-${view}.html`);
        this.section = await res.text();
      }
    }));
  });