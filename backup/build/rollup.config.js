const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const json = require('rollup-plugin-json')
const nodeResolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')

module.exports = (config) => {
  const { input, fileName, name } = config
  return {
    input: {
      input,
      external: [
        'dayjs'
      ],
      plugins: [
        babel({
          exclude: 'node_modules/**'
        }),
        commonjs({
          include: ['node_modules/tzdata/tzdata.js'],
          namedExports: {
            'node_modules/tzdata/tzdata.js': ['zones', 'rules']
          }
        }),
        json({
          include: 'node_modules/tzdata/timezone-data.json',
          preferConst: true,
          indent: '  '
        }),
        nodeResolve({
          jsnext: true,
          main: true
        }),
        uglify()
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
