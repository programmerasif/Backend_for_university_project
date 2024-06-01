import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    languageOptions: {
      parser: parser,
      globals: {
        ...globals.browser,
        process: 'readonly', // Define process as a global variable here
      },
    },
    // languageOptions: { globals: globals.browser },
    ignores: ['**/node_modules/', '.dist/'],
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-unused-expressions': 'error',
      'no-undef': 'error',
    },
    globals: {
      process: 'readonly',
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
