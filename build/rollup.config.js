const babel = require('rollup-plugin-babel')
const { uglify } = require('rollup-plugin-uglify')

module.exports = (config) => {
  const { input, fileName, name } = config
  return {
    input: {
      input,
      external: [
        'dayjs'
      ],
      plugins: [
        {
          transform ( code, id ) {
            console.log('before babel', id)
          }
        },
        babel({
          exclude: 'node_modules/**'
        }),
        {
          transform ( code, id ) {
            console.log('before uglify', id)
          }
        },
        uglify(),
        {
          transform ( code, id ) {
            console.log('after all', id)
          }
        },
      ]
    },
    output: {
      file: fileName,
      format: 'umd',
      name: name || 'dayjs',
      globals: {
        dayjs: 'dayjs'
      },
      sourcemap: true
    }
  }
}
