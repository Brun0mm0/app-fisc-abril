document.addEventListener('alpine:init', () => {
    Alpine.store('auth', {
        user: null,

        async login(usuario, password) {
            try {
            const res = await api.post('/index/login', { usuario, password });
            // console.log(res.data);
            this.user = {user: usuario, roles: [res.data.message]}; // Simulación de roles
            localStorage.setItem('user', JSON.stringify(this.user));
            return true;
            } catch (error) {   
                throw new Error('Login incorrecto.');
            }},

        async chechkOut() {
            try {
                const res = await api.get('/index/login');
                return true;
            } catch (error) {   
                throw new Error('Logout incorrecto.');
                window.location.hash = '#/login';
            }},
        

        // logout() {
        //     this.token = '';
        //     this.user = null;
        //     localStorage.removeItem('token');
        //     localStorage.removeItem('user');
        //     window.location.hash = '#/login';
        // },

        hasRole(role) {
            const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
            return user?.roles.includes(role);
        }
        })
    })