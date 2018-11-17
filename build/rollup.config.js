const babel = require('rollup-plugin-babel')
const { uglify } = require('rollup-plugin-uglify')

module.exports = (config) => {
  const { input, fileName, name } = config
  return {
    input: {
      input,
      external: [
        'dayjs-ext', 'fast-plural-rules', 'timezone-support/dist/lookup-convert',
        'timezone-support/dist/data', 'timezone-support/dist/data-1900-2050',
        'timezone-support/dist/data-2012-2022'
      ],
      plugins: [
        babel({
          exclude: 'node_modules/**'
        }),
        uglify()
      ]
    },
    output: {
      file: fileName,
      format: 'umd',
      name: name || 'dayjs',
      globals: {
        'dayjs-ext': 'dayjs',
        'fast-plural-rules': 'fastPluralRules',
        'timezone-support/dist/lookup-convert': 'timezone-support',
        'timezone-support/dist/data': 'timezone-data',
        'timezone-support/dist/data-1900-2050': 'timezone-data-1900-2050',
        'timezone-support/dist/data-2012-2022': 'timezone-data-2012-2022'
      },
      sourcemap: true
    }
  }
}
