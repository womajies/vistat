import VueRouter from 'vue-router';
import routes from './routes';

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
});

router.beforeEach(async (to, from, next) => {
  if (to.meta['title']) {
    document.title = to.meta['title'];
    let description = document.querySelector('head meta[name="description"]');
    if (description && to.meta['description']) description.setAttribute('content', to.meta['description']);
  }

  next();
});

export default router;
