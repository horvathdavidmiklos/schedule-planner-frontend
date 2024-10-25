<template>
  <div class="container">
    <h2 class="title">Bejelentkezés</h2>

    <!-- login error message -->
    <div v-if="errorMessage" class="feedback-message error">
      <p>{{ errorMessage }}</p>
    </div>

    <form @submit.prevent="login" class="form">
      <div class="form-group">
        <label for="id">Felhasználónév:</label>
        <input id="id" type="text" v-model="form.id" required class="input" />
      </div>
      <div class="form-group">
        <label for="password">Jelszó:</label>
        <input id="password" type="password" v-model="form.password" required class="input" />
      </div>
      <button type="submit" class="submit-btn">Bejelentkezés</button>
    </form>

    <!-- Google Sign-In -->
    <button @click="googleLogin" class="google-login-btn">
      Bejelentkezés Google fiókkal
    </button>

    <!-- login success message -->
    <div v-if="successMessage" class="feedback-message success">
      <p>{{ successMessage }}</p>
    </div>

    <div class="form-checkbox">
      <input type="checkbox" id="rememberMe" v-model="rememberMe" />
      <label for="rememberMe">Emlékezz rám</label>
    </div>

    <div class="navigation-links">
      <p>Még nincs fiókod? <router-link to="/registration">Regisztrálj</router-link></p>
    </div>
  </div>
  <div class="navigation-links">
    <p>Vissza a <router-link to="/home">főoldalra</router-link></p>
  </div>
</template>

<script>
import { useGoogleLogin } from 'vue3-google-oauth2';
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        id: '',
        password: ''
      },
      errorMessage: '',
      successMessage: '',
      rememberMe: false
    };
  },
  mounted() {
    // Bejelentkezési adatok betöltése a LocalStorage-ból
    const savedId = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    if (savedId && savedPassword) {
      this.form.id = savedId;
      this.form.password = savedPassword;
      this.rememberMe = true;
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/schedule-planner/account/login', this.form);
        console.log(response)
        this.successMessage = 'Sikeres bejelentkezés.';
        this.errorMessage = '';

        if (this.rememberMe) {
          localStorage.setItem('username', this.form.id);
          localStorage.setItem('password', this.form.password);
        } else {
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }
      } catch (error) {
        this.successMessage = '';
        this.errorMessage = 'Hiba történt a bejelentkezés során.';
      }
    },
    googleLogin() {
      const { signIn } = useGoogleLogin({
        clientId: 'YOUR_GOOGLE_CLIENT_ID',  // Google kliens azonosító
        scope: 'profile email',
        prompt: 'consent'
      });

      signIn()
        .then(googleUser => {
          const token = googleUser.getAuthResponse().id_token;
          axios.post('/schedule-planner/account/google-login', { token })
            .then(() => {
              this.successMessage = 'Google bejelentkezés sikeres!';
            })
            .catch(() => {
              this.errorMessage = 'Hiba történt a Google bejelentkezés során.';
            });
        })
        .catch(() => {
          this.errorMessage = 'Google bejelentkezés sikertelen.';
        });
    }
  }
};
</script>


