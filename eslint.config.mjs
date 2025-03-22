import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  {
    react: true,
    ignores: ['src/components/ui'],
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
      'style/jsx-one-expression-per-line': 'off',
      'react-dom/no-missing-button-type': 'off',
      '@next/next/no-img-element': 'off',
      'style/jsx-self-closing-comp': 'warn',
      'unused-imports/no-unused-vars': ['warn', { caughtErrors: 'none' }],
    },
  },
).prepend(
  compat.config({
    extends: 'plugin:@next/next/core-web-vitals',
  }),
)
