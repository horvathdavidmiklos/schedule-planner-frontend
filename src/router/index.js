import { createRouter, createWebHistory } from 'vue-router';
import Register from '../components/AccountRegistration.vue';

const routes = [
  {
    path: '/registration',
    name: 'AccountRegistration',
    component: Register
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
