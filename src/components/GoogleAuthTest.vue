<template>
  <div>
    <button @click="login">Bejelentkezés Google-lal</button>
  </div>
</template>

<script>
import { gapi } from 'gapi-script';

export default {
  mounted() {
    // Google API betöltése
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: 'YOUR_GOOGLE_CLIENT_ID', // Cseréld ki a saját Google Client ID-dal
        scope: 'profile email',
      }).then(() => {
        console.log("Google API initialized");
      }).catch((error) => {
        console.error("Hiba a Google API inicializálása során:", error);
      });
    });
  },
  methods: {
    login() {
      const authInstance = gapi.auth2.getAuthInstance();
      if (!authInstance) {
        console.error("A Google Auth instance nem érhető el");
        return;
      }

      authInstance.signIn().then((googleUser) => {
        const profile = googleUser.getBasicProfile();
        console.log("Google ID:", profile.getId()); // Google egyedi azonosító
        // Itt kezelheted a login után szükséges teendőket
      }).catch((error) => {
        console.error("Hiba a bejelentkezés során:", error);
      });
    },
  },
};
</script>
