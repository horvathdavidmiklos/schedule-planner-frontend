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

    <div class="form-container">
      <div class="form-checkbox">
        <input type="checkbox" id="rememberMe" v-model="rememberMe" />
        <label for="rememberMe">Emlékezz rám</label>
      </div>


      <div class="space">
        <button @click="login_with_google" class="gsi-material-button">
          <div class="gsi-material-button-state"></div>
          <div class="gsi-material-button-content-wrapper">
            <div class="gsi-material-button-icon">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
                xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
                <path fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
                </path>
                <path fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
                </path>
                <path fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
                </path>
                <path fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
                </path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span class="gsi-material-button-contents">Google bejelentkezés </span>
            <span style="display: none;">Sign in with Google</span>
          </div>
        </button>
      </div>

      <!-- login success message -->
      <div v-if="successMessage" class="feedback-message success">
        <p>{{ successMessage }}</p>
      </div>

      <div class="navigation-links">
        <p>Még nincs fiókod? <router-link to="/registration">Regisztrálj</router-link></p>
      </div>
    </div>
    <div class="navigation-links">
      <p>Vissza a <router-link to="/home">főoldalra</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { gapi } from 'gapi-script';
import '@/assets/google-login.css';

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
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: '62414934269-3lp22630m9n3h35jmgbatrquh5b2o42v.apps.googleusercontent.com', // Cseréld ki a saját Google Client ID-dal
        scope: 'profile email',
      }).then(() => {
        console.log("Google API initialized");
      }).catch((error) => {
        console.error("Hiba a Google API inicializálása során:", error);
      });
    });
  },
  methods: {
    async login() {
      console.log(this.form);
      try {
        const response = await axios.post('/schedule-planner/account/login', this.form);
        console.log(response.data);
        this.successMessage = 'Sikeres bejelentkezés.';
        this.errorMessage = '';
        if (this.rememberMe) {
          localStorage.setItem('username', this.form.id);
          localStorage.setItem('password', this.form.password);
        } else {
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }

        localStorage.setItem('logged-account-token', response.data);
        this.$router.push('/dashboard');

      } catch (error) {
        this.successMessage = '';
        switch (error.response.data) {
          case 'USERNAME_OR_PASSWORD_NOT_VALID':
            this.errorMessage = 'Hibás felhasználónév vagy jelszó.';
            break;
          case 'ACCOUNT_NOT_VERIFIED':
            this.errorMessage = 'A fiók még nincs hitelesítve.';
            break;
          default:
            this.errorMessage = 'Hiba történt a bejelentkezés során.';
        }
      }
    },
    login_with_google() {
      const authInstance = gapi.auth2.getAuthInstance();

      if (!authInstance) {
        console.error("A Google Auth instance nem érhető el");
        return;
      }

      authInstance.signIn().then((googleUser) => {
        const profile = googleUser.getBasicProfile();
        const userData = {
          nickname: profile.getGivenName(), // Keresztnév
          username: profile.getId(), // Google egyedi azonosító
          email: profile.getEmail(), // Email cím
          profilePictureUrl: profile.getImageUrl() // Profilkép URL
        };
        console.log(userData);
        axios.post('/schedule-planner/account/third-party-login', userData)
          .then(response => {
            console.log("Bejelentkezési válasz:", response.data);
            localStorage.setItem('logged-account-token', response.data);
            this.$router.push('/dashboard');
          })
          
          .catch(error => {
            console.error("Hiba a bejelentkezés során:", error);
          });

      }).catch((error) => {
        console.error("Hiba a bejelentkezés során:", error);
      });
    },
    
  }
};

</script>
