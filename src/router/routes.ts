import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/users',
        component: () => import('src/pages/Users.vue'),
        meta: { Auth: true }
      },
      {
        path: '/empresas',
        component: () => import('src/pages/CustomersPage.vue'),
        meta: { Auth: true }
      },
      {
        path: '/contracts',
        component: () => import('src/pages/ContractsPage.vue'),
        meta: { Auth: true }
      },
      {
        path: '/vehicles',
        component: () => import('src/pages/VehiclesPage.vue'),
        meta: { Auth: true }
      },
      {
        path: '/activities',
        component: () => import('src/pages/ActivitiesPage.vue'),
        meta: { Auth: true }
      },
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),

      },
      {
        path: '/login',
        component: () => import('src/pages/LoginPage.vue'),
        meta: { Auth: false },
        name: 'login'

      },
    ],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
