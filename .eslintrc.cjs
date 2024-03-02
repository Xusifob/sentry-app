module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // TypeScript rules
    'plugin:react/recommended', // React rules
    'plugin:react-hooks/recommended', // React hooks rules
    'plugin:jsx-a11y/recommended', // Accessibility rules,
    'plugin:tailwindcss/recommended',
    'plugin:jest/recommended', // usefull for cypress
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    // We will use TypeScript's types for component props instead
    'react/prop-types': 'off',
    "no-multi-spaces": ['error'],
    "object-curly-spacing": [2, "always"],
    "jsx-quotes": ['error', "prefer-single"],
    'react/jsx-tag-spacing': [2, {
      "closingSlash": "never",
      "beforeSelfClosing": "always",
      "afterOpening": "never",
      "beforeClosing": "allow"
    }],



    // Why would you want unused vars?
    '@typescript-eslint/no-unused-vars': ['error'],
    'semi': [2, 'always'],
    'semi-spacing': [2, { 'before': false, 'after': true }],
    'space-before-function-paren': [2, {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'no-console': 2,
    'no-multiple-empty-lines': [2, { 'max': 3, 'maxBOF': 0, 'maxEOF': 1 }],
    'max-len': ['error', { 'code': 120, 'ignoreRegExpLiterals': true }],
    'curly': [2, 'all'],
    'indent': ['error', 2, { 'offsetTernaryExpressions': false, 'SwitchCase': 1 }],

    'react/jsx-max-props-per-line': [2, { 'maximum': 2 }],
    'react/jsx-handler-names': 0,

    'jest/no-disabled-tests': 2,
    'jest/no-focused-tests': 2,
    'jest/no-identical-title': 2,
    'jest/prefer-to-have-length': 2,
    'jest/valid-expect': 2,
    "jest/expect-expect": [
      "error",
      {
        "assertFunctionNames": [
          "expect",
          "expect*",
        ],
      }
    ]
  }
}
