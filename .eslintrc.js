module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['standard', 'plugin:prettier/recommended'], //
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  rules: {
    'prettier/prettier': ['error'],
    eqeqeq: 'off',
    'prefer-const': 'off',
    'no-empty': 'off',
    'no-unused-vars': 'off',
    'no-debugger': 'off',
  },
  overrides: [
    {
      files: ['test/*.js'],
      rules: {
        quotes: ['error', 'single'],
      },
    },
  ],
};
