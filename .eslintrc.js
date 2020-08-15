module.exports = {
    env: {
        'browser': true,
        'commonjs': true,
        'es2020': true,
        'node': true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        'ecmaVersion': 2020
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always']
    }
};
