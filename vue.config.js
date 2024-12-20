const fs = require('fs');
const webpack = require('webpack');

module.exports = {
  transpileDependencies: [
    // Ide írd a csomagokat, amiket transpile-ni akarsz. Például: 'vuetify'
  ],
  devServer: {
    proxy: {
      '/schedule-planner': {
        target: process.env.BACKEND_BASE_URL,
        changeOrigin: true,
        secure: false
      }
    },
    https: {
      key: fs.readFileSync(process.env.CERT_URL + '/server.key'),
      cert: fs.readFileSync(process.env.CERT_URL + '/server.crt')
    },
    port: 80
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true),
      }),
    ],
  }
};
