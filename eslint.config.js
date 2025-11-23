import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: {
    overrides: {
      'ts/no-unsafe-function-type': 'off',
      'ts/ban-ts-comment': 'off',
    },
  },
  rules: {
    'style/indent-binary-ops': 'off',
  },
})
