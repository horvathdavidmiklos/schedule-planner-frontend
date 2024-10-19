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

    <!-- login success message -->
    <div v-if="successMessage" class="feedback-message success">
      <p>{{ successMessage }}</p>
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
        id: '',
        password: ''
      },
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async login() {
      console.log(this.form); // Log to see the form data
      try {
        const response = await axios.post('/schedule-planner/account/login', this.form);
        console.log(response.data);
        this.successMessage = 'Sikeres bejelentkezés.';
        this.errorMessage = '';
        // További lépéseket itt adhatsz hozzá, például a felhasználó átirányítása
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
    }
  }
};
</script>
