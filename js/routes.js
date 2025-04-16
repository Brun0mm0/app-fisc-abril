window.routes = {
    '/login' : {
        component: 'login',
        templateUrl: '/js/layouts/templates/login.html',
        script: '/js/layouts/login.js',
        public: true,
        title: 'Login',
    },
    '/dashboard' : {
        component: 'dashboard',
        templateUrl: '/js/layouts/templates/dashboard.html',
        script: '/js/layouts/dashboard.js',
        public: false,
        roles: ['admin', 'user','personal'],
        title: 'Dashboard',
    },
    '/admin' : {
        component: 'admin',
        templateUrl: '/js/layouts/templates/dashboard.html',
        script: '/js/layouts/dashboard.js',
        public: false,
        roles: ['admin'],
        title: 'Admin',
    },
};