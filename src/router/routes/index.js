// import personal from './personal';

export default [
  {
    path: '/',
    component: () => import('@/pages/index'),
    name: 'home',
    meta: {
      title: 'Vistat',
      description: 'Тестовое задание',
    },
  },
  // ...personal,
];
