const fs = require('fs');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/schedule-planner': {
        target: process.env.BACKEND_BASE_URL,
        changeOrigin: true,
        secure: false
      }
    },
    https: {
      key: fs.readFileSync(process.env.CERT_URL+'/server.key'),
      cert: fs.readFileSync(process.env.CERT_URL+'/server.crt')
    },
    port: 80
  }
});
