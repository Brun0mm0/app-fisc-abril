document.addEventListener('alpine:init', () => {

    Alpine.data('app', () => ({
        view: '',

        async init() {
            window.addEventListener('hashchange', this.routeChange.bind(this));
            await this.routeChange();
        },

        async routeChange() {
            const fullHash = window.location.hash.slice(1) || '/login';
            const basePath = '/' + fullHash.split('/')[1]; // Extrae la base de la ruta

            const route = routes[basePath]
            
            if (!route) {
                this.view = '<h1>404 Not found!</h1>';
                return;
            }

            // Protegemos rutas
            
            const auth = Alpine.store('auth');
            if(!route.public) {
                if(!auth.chechkOut()) {
                    window.location.hash = '#/login';
                    return;
                }

                // Chequeo de roles
                if(route.roles && !route.roles.some(role => auth.hasRole(role))) {
                    this.view = '<h1>403 - Acceso Denegado</h1>';
                    return;
                }}
            

            // Carga la vista
            const res = await fetch(route.templateUrl);
            this.view = await res.text();

            // Carga el script si existe
            if(route.script && !document.querySelector(`script[src="${route.script}"]`)) {
                const script = document.createElement('script');
                script.src = route.script;
                script.defer = true; // Asegúrate de que el script se ejecute después de que el DOM esté completamente cargado
                document.body.appendChild(script);
            }
        }
    }))
})