import { createRouter, createWebHistory } from 'vue-router';
import RegistrationNewAccount from '../components/RegistrationNewAccount.vue';
import LoginIntoAccount from '../components/LoginIntoAccount.vue';
import VerifyEmail from '../components/VerifyEmail.vue';
import MainSite from '../components/MainSite.vue';

const routes = [
  {
    path: '/registration',
    name: 'RegistrationNewAccount',
    component: RegistrationNewAccount
  },
  {
    path: '/login',
    name: 'LoginIntoAccount',
    component: LoginIntoAccount
  },
  {
    path: '/schedule-planner',
    name: 'MainSite',
    component: MainSite
  },
  {
    path: '/verify-email/:token/:username',
    name: 'verify-email',
    props: true,
    component: VerifyEmail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
