// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: false,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // 'semi': ['error','always'],
    'semi': 'off',
    'semi-spacing': 'off',
    // "spaced-comment": ["error", "always", { "exceptions": ["-", "+"] }],
    "spaced-comment": 'off',
    'quotes': ['off'],
    'indent':'off',
    // allow async-await
    'generator-star-spacing': 'off',
    'arrow-spacing': 'off',
    // allow debugger during development
    //设置最大行数
    'no-multiple-empty-lines': ['error', {max: 2 }],
    //逗号的前、后空格
    // 'comma-spacing': ["error", { "before": false, "after": false }],
    'comma-spacing': 'off',
    'comma-dangle':'off',
    'space-before-blocks': "off",
    'space-before-function-paren': 'off',
    'keyword-spacing': 'off',
    'key-spacing':'off',
    'space-infix-ops':'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
