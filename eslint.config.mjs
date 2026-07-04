import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import testingLibrary from 'eslint-plugin-testing-library';
import prettier from 'eslint-config-prettier';

const config = [
  { ignores: ['styled-system/**'] },
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  // Workaround for eslint-plugin-react's legacy context.getFilename() version
  // auto-detection, removed in ESLint v10 (jsx-eslint/eslint-plugin-react#3977).
  {
    settings: {
      react: { version: '19' },
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    plugins: {
      'testing-library': testingLibrary,
    },
    rules: {
      ...testingLibrary.configs.react.rules,
    },
  },
];

export default config;
