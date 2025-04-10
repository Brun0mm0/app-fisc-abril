document.addEventListener('alpine:init', () => {

    Alpine.store('dev', { modo: true})

    Alpine.data('app', () => ({
        view: '',
        async init() {
            window.addEventListener('hashchange', this.routeChange.bind(this));
            await this.routeChange();
        },

        async routeChange() {
            const hash = window.location.hash.slice(1) || '/login';
            const route = routes[hash]
            
            if (!route) {
                this.view = '<h1>404 Not found!</h1>';
                return;
            }

            // Progemos rutas
            if(!Alpine.store('dev').modo) {
            const auth = Alpine.store('auth');
            if(!route.public) {
                if(!auth.isAuthenticated()) {
                    window.location.hash = '#/login';
                    return;
                }

                // Chequeo de roles
                if(route.roles && !route.roles.some(role => auth.hasRole(role))) {
                    this.view = '<h1>403 - Acceso Denegado</h1>';
                    return;
                }}
            }

            // Carga la vista
            const res = await fetch(route.templateUrl);
            this.view = await res.text();

            // Carga el script si existe
            if(route.script && !document.querySelector(`script[src="${route.script}"]`)) {
                const script = document.createElement('script');
                script.src = route.script;
                document.body.appendChild(script);
            }
        }
    }))
})