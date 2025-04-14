document.addEventListener('alpine:init', () => {
    Alpine.store('auth', {
        user: null,
        token: localStorage.getItem('token') || '',

        async login(email, password) {
            try {
            const res = await api.post('/api/login', { email, password });
            this.token = res.data.token;
            localStorage.setItem('token', this.token);
            this.user = {user: email, roles: ['admin']}; // Simulación de roles
            localStorage.setItem('user', JSON.stringify(this.user));
            return true;
            } catch (error) {   
                throw new Error('Login incorrecto.');
            }},

        logout() {
            this.token = '';
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.hash = '#/login';
        },

        getUser() {
            if (!this.user) {
                const userStr = localStorage.getItem('user');
                if (userStr) this.user = JSON.parse(userStr);
            }
            return this.user;
        },

        isAuthenticated() {
            return !!this.token;
        },

        hasRole(role) {
            const user = this.getUser();
            return user?.roles.includes(role);
        }
        })
    })