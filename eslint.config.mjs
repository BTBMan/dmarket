import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  {
    react: true,
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
      'style/jsx-one-expression-per-line': 'off',
    },
  },
).prepend(
  compat.config({
    extends: 'plugin:@next/next/core-web-vitals',
  }),
)
