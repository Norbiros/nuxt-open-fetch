import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['docs/**', 'playground/**'],
  typescript: {
    overrides: {
      'ts/no-unsafe-function-type': 'off',
      'ts/ban-ts-comment': 'off',
    },
  },
  rules: {
    'perfectionist/sort-imports': 'off',
    'pnpm/yaml-enforce-settings': 'off',
    'style/indent-binary-ops': 'off',
  },
})
