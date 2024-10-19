const fs = require('fs');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/schedule-planner': {
        target: 'https://localhost:8443',
        changeOrigin: true,
        secure: false
      }
    },
    https: {
      key: fs.readFileSync('./certs/server.key'),
      cert: fs.readFileSync('./certs/server.crt')
    },
    port: 8080
  }
});
