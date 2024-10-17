<template>
  <div class="container">
    <h2 class="title">Regisztráció</h2>
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

    <!-- Sikeres regisztrációs üzenet -->
    <div v-if="successMessage" class="success-message">
      <p>{{ successMessage }}</p>
    </div>

    <!-- Hiba modális ablak -->
    <div v-if="errorMessage" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Hiba</h3>
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>


<script>
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
      errorMessage: '',  // Hibák üzenetének tárolása
      successMessage: ''  // Sikeres üzenet tárolása
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('/schedule-planner/account/create', this.form);
        console.log(response.data);

        // Ha a regisztráció sikeres, állítsuk be a sikeres üzenetet
        this.successMessage = 'A fiók sikeresen létrejött.';
        this.errorMessage = '';  // Töröljük a hibaüzenetet, ha van
      } catch (error) {
        this.successMessage = ''; // Töröljük a sikerüzenetet hibánál
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
          default:
            this.errorMessage = error.response.data;
        }
      }
    },
    closeModal() {
      this.errorMessage = '';  // A modal bezárása
    }
  }
};
</script>


<style scoped>

/* Sikeres üzenet stílusa */
.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
}


/* Alap stílusok */
.container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #666;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}

.submit-btn {
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #218838;
}

/* Modális ablak stílusai */
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  padding-top: 100px;
}

.modal-content {
  background-color: #fff;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}
</style>
