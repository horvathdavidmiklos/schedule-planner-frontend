<template>
    <div class="main-container">
      <h1>Üdvözlünk!</h1>
      
      <div class="link-container">
        <router-link to="/registration" class="main-link">Regisztráció</router-link>
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

  </style>
  