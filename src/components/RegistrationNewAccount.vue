<template>
  <div class="container">
    <h2 class="title">Regisztráció</h2>

    <!-- registration error message -->
    <div v-if="errorMessage" class="feedback-message error">
      <p>{{ errorMessage }}</p>
    </div>

    <form @submit.prevent="register" class="form">
      <div class="form-group">
        <label for="username">Felhasználónév:</label>
        <input id="username" type="text" v-model="form.username" required class="input" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="form.email" required class="input" />
      </div>
      <div class="form-group">
        <label for="password">Jelszó:</label>
        <input id="password" type="password" v-model="form.password" required class="input" />
      </div>
      <div class="form-group">
        <label for="passwordConfirmation">Jelszó megerősítése:</label>
        <input id="passwordConfirmation" type="password" v-model="form.passwordConfirmation" required class="input" />
      </div>
      <button type="submit" class="submit-btn">Regisztrálás</button>
    </form>

    <!-- registration success message -->
    <div v-if="successMessage" class="feedback-message success">
      <p>{{ successMessage }}</p>
    </div>

    <!-- navigation links -->
    <div class="navigation-links">
      <p>Már van fiókod? <router-link to="/login">Jelentkezz be!</router-link></p>
      <button @click="goBack" class="back-btn">Vissza a főoldalra</button>
    </div>
    
  </div>
</template>

<script>
import '@/assets/basic.css';
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('/schedule-planner/account/create', this.form);
        this.successMessage = 'A fiók sikeresen létrejött.';
        this.errorMessage = '';
      } catch (error) {
        this.successMessage = '';
        switch (error.response.data) {
          case 'EMAIL_IS_ALREADY_TAKEN':
            this.errorMessage = 'Az email cím már foglalt.';
            break;
          case 'USERNAME_IS_ALREADY_TAKEN':
            this.errorMessage = 'A felhasználónév már foglalt.';
            break;
          case 'PASSWORD_NOT_MATCHING':
            this.errorMessage = 'A jelszavak nem egyeznek';
            break;
          case 'EMAIL_WRONG_SYNTAX' :
            this.errorMessage = 'Az email formátuma helytelen';
            break;
          default:
            this.errorMessage = error.response.data;
        }
      }
    },
    goBack() {
      this.$router.push('/schedule-planner');
    }
  }
};
</script>
