module.exports = {
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended'
    ],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  };
  