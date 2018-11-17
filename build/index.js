const rollup = require('rollup')
const fs = require('fs')
const util = require('util')
const path = require('path')
const configFactory = require('./rollup.config')

const { promisify } = util

const promisifyReadDir = promisify(fs.readdir)
const promisifyReadFile = promisify(fs.readFile)
const promisifyWriteFile = promisify(fs.writeFile)

const formatName = n => n.replace(/\.js/, '').replace('-', '_')

async function build(option) {
  const bundle = await rollup.rollup(option.input)
  await bundle.write(option.output)
}

async function addLimitedTimeZonePluginVersions() {
  const originalFile = path.join(__dirname, '../plugin/timeZone.js')
  const originalContent = await promisifyReadFile(originalFile, { encoding: 'utf-8' })
  const limitedVersions = ['1900-2050', '2012-2022']
  for (let i = 0; i < limitedVersions.length; ++i) { // eslint-disable-line no-plusplus
    const limitedVersion = limitedVersions[i]
    const limitedFile = path.join(__dirname, `../plugin/timeZone-${limitedVersion}.js`)
    const limitedContent = originalContent.replace('require("timezone-support")',
      `require("timezone-support/dist/index-${limitedVersion}")`)
    // eslint-disable-next-line no-await-in-loop
    await promisifyWriteFile(limitedFile, limitedContent)
  }
}

(async () => {
  try {
    const locales = await promisifyReadDir(path.join(__dirname, '../src/locale'))
    locales.forEach((l) => {
      build(configFactory({
        input: `./src/locale/${l}`,
        fileName: `./locale/${l}`,
        name: `dayjs_locale_${formatName(l)}`
      }))
    })

    const plugins = await promisifyReadDir(path.join(__dirname, '../src/plugin'))
    plugins.forEach((l) => {
      build(configFactory({
        input: `./src/plugin/${l}/index`,
        fileName: `./plugin/${l}.js`,
        name: `dayjs_plugin_${formatName(l)}`
      }))
    })

    build(configFactory({
      input: './src/index.js',
      fileName: './dayjs.min.js'
    }))

    addLimitedTimeZonePluginVersions()
  } catch (e) {
    console.error(e) // eslint-disable-line no-console
  }
})()
