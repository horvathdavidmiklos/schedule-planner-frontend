import { createRouter, createWebHistory } from 'vue-router';
import RegistrationNewAccount from '../components/RegistrationNewAccount.vue';
import LoginIntoAccount from '../components/LoginIntoAccount.vue';
import VerifyEmail from '../components/VerifyEmail.vue';
import Home from '../components/Home.vue';
import GoogleAuthTest from '../components/GoogleAuthTest.vue';

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
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/verify-email/:token(.*)/:username(.*)/:purpose',
    name: 'verify-email',
    props: true,
    component: VerifyEmail,
  },

  {
    path: '/google-auth',
    name: 'google-auth',
    props: true,
    component: GoogleAuthTest,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
