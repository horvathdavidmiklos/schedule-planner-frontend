<template>
    <div class="main-container">
      <h1>Üdvözlünk!</h1>
      
      <div class="link-container">
        <router-link to="/register" class="main-link">Regisztráció</router-link>
        <router-link to="/login" class="main-link">Bejelentkezés</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainSite'
  };
  </script>
  
  <style scoped>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  .link-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .main-link {
    background-color: #007BFF;
    color: white;
    text-decoration: none;
    padding: 15px 30px;
    border-radius: 5px;
    font-size: 18px;
    transition: background-color 0.3s ease;
  }
  
  .main-link:hover {
    background-color: #0056b3;
  }
  </style>
  