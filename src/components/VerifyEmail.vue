<template>
    <div class="container">
      <h2 class="title">Email cím ellenőrzése</h2>
  
      <!-- Succesful verification message -->
      <div v-if="successMessage" class="feedback-message success">
        <p>{{ successMessage }}</p>
      </div>
  
      <!-- Error message -->
      <div v-if="errorMessage" class="feedback-message error">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import '@/assets/basic.css';
  import axios from 'axios';

  export default {
  props: ['token', 'username'], // A route paraméterek prop-ként történő fogadása
  data() {
    return {
      successMessage: '',
      errorMessage: ''
    };
  },
  async created() {
    try {
      console.log(this.token,this.username);
      const response = await axios.get(`/schedule-planner/account/verify-email?token=${this.token}&username=${this.username}`);
      this.errorMessage = '';
      if (response.status === 200) {
        this.successMessage = 'Sikeres email ellenőrzés!';
      }
    } catch (error) {
      switch(error.response.data){
        case 'ACCOUNT_NOT_FOUND':
          this.errorMessage = 'A fiók nem található';
          break;
        case 'INVALID_OR_EXPIRED_TOKEN_EXCEPTION':
          this.errorMessage = 'Érvénytelen vagy lejárt token';
          break;
        case 'asd2':
          this.errorMessage = 'A fiók nem található';
          break;
        default:
        this.errorMessage = error.response.data;
      }
    }
  }
};
  </script>