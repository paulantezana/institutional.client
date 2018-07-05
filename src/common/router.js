const routes = [
    {
        id: 'dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        path: '',
    },
    {
        id: 'instituto',
        name: 'Instituto',
        icon: 'credit-card',
        path: '/instituto',
    },
    {
        id: 'filial',
        name: 'Filiales',
        icon: 'shopping-cart',
        path: '/filial',
    },
    {
        id: 'carrera',
        name: 'Programa de estidios',
        icon: 'user',
        path: '/carrera',
    },
    {
        id: 'Perfil',
        name: 'perfil',
        icon: 'appstore-o',
        path: '/perfil',
    },
    {
        id: 'config',
        name: 'Configuracion',
        icon: 'team',
        path: '/config',
    },
    {
        id: 'permisos',
        name: 'Permisos',
        icon: 'team',
        path: '/permisos',
    },
    {
        path: "/user",
        component: <h1>user</h1>,
        routes: [
            {
                path: "/user/login",
                component: <h1>login</h1>
            },
            {
                path: "/user/recover",
                component: ()=> <h1>recover</h1>
            }
        ]
    }
];

export default routes;