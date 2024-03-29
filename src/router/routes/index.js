// import personal from './personal';
import home from '../../pages/index'

export default [
  {
    path: process.env.NODE_ENV === 'production' ? '/vistat/' : '/',
    component: home,
    name: 'home',
    meta: {
      title: 'Vistat',
      description: 'Тестовое задание',
    },
  },
  // ...personal,
];
