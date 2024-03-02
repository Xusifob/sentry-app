module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true
    },
    parser: '@typescript-eslint/parser',
    settings: {
        react: {
            version: 'detect'
        }
    },

    plugins: ['unused-imports'],

    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // TypeScript rules
        'plugin:react/recommended', // React rules
        'plugin:react-hooks/recommended', // React hooks rules
        'plugin:jsx-a11y/recommended', // Accessibility rules,
        'plugin:tailwindcss/recommended'
    ],
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
        '@typescript-eslint/no-unused-vars': ['error'],
        "unused-imports/no-unused-imports": "error",
        'semi': [2, 'always'],
        'semi-spacing': [2, {'before': false, 'after': true}],
        'space-before-function-paren': [2, {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always'
        }],
        'no-console': 2,
        'no-multiple-empty-lines': [2, {'max': 3, 'maxBOF': 0, 'maxEOF': 1}],
        'max-len': ['warn', {'code': 130, 'ignoreRegExpLiterals': true}],
        'curly': [2, 'all'],
        'indent': ['error', 2, {'offsetTernaryExpressions': false, 'SwitchCase': 1}],

        '@typescript-eslint/ban-ts-comment': 'off',
        'ban-ts-comment': 'off',
        'react/jsx-max-props-per-line': [2, {'maximum': 2}],
        'react/jsx-handler-names': 0,
        'tailwindcss/no-custom-classname': ['error', {
            'whitelist': [
                'gradient',
                'nav-shadow',
                'pressable'
            ],
        }],
    }
};
