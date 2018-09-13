const rollup = require('rollup')
const fs = require('fs')
const util = require('util')
const path = require('path')
const configFactory = require('./rollup.config')

const { promisify } = util

const promisifyReadDir = promisify(fs.readdir)

const formatName = n => n.replace(/\.js/, '').replace('-', '_')

async function build(option) {
  const bundle = await rollup.rollup(option.input)
  await bundle.write(option.output)
}

(async () => {
  console.log('*** 1')
  try {
    const locales = await promisifyReadDir(path.join(__dirname, '../src/locale'))
    console.log('*** 2')
    locales.forEach((l) => {
      console.log('*** 3', l)
      build(configFactory({
        input: `./src/locale/${l}`,
        fileName: `./locale/${l}`,
        name: `dayjs_locale_${formatName(l)}`
      }))
    })
    console.log('*** 4')

    const plugins = await promisifyReadDir(path.join(__dirname, '../src/plugin'))
    console.log('*** 5')
    plugins.forEach((l) => {
      console.log('*** 6', l)
      build(configFactory({
        input: `./src/plugin/${l}/index`,
        fileName: `./plugin/${l}.js`,
        name: `dayjs_plugin_${formatName(l)}`
      }))
    })

    console.log('*** 7')
    build(configFactory({
      input: './src/index.js',
      fileName: './dayjs.min.js'
    }))
  } catch (e) {
    console.log('*** 8')
    console.error(e) // eslint-disable-line no-console
  }
})()
