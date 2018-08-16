const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { join } = require('path')

const dayLocaleDirectory = join(__dirname, '../src/locale')
const momentLocaleDirectory = join(__dirname, '../../moment/src/locale')

function warn (message) {
  console.warn(message)
}

function fail (message) {
  console.error(message)
  process.exit(1)
}

function findFormats (dayLocale) {
  for (let i = 0; i < dayLocale.length; ++i) {
    if (/\bformats\s*:\s*{/.test(dayLocale[i])) {
      return i
    }
  }
}

function findLongDateFormat (momentLocale) {
  let startFormat
  let endFormat
  for (let i = 0; i < momentLocale.length; ++i) {
    const localeLine = momentLocale[i]
    if (startFormat) {
      if (/}\s*,/.test(localeLine)) {
        endFormat = i
        break
      }
    } else {
      if (/\blongDateFormat\s*:\s*\{/.test(localeLine)) {
        startFormat = i + 1
      }
    }
  }
  return { startFormat, endFormat }
}

function findRelativeTime (dayLocale) {
  for (let i = 0; i < dayLocale.length; ++i) {
    if (/\brelativeTime\s*:\s*{/.test(dayLocale[i])) {
      return i
    }
  }
}

function convertFormats (longDateFormat) {
  const formats = longDateFormat
    .map(localeLine => {
      const localeMatch = /^\s*(\w+)\s*:\s*['"]([^'"]+)['"]/.exec(localeLine)
      if (!localeMatch) {
        fail('Unrecognized line: "' + localeLine + '"')
      }
      return '    ' + localeMatch[1] + ': \'' + localeMatch[2] + '\''
    })
    .filter(localeLine => /^\s*[A-Z]+/.test(localeLine))
  const lastFormatIndex = formats.length - 1
  return formats.map((localeLine, lineIndex) => lineIndex < lastFormatIndex ? localeLine + ',' : localeLine)
}

function updateLocale (dayLocaleFile) {
  console.info('Processing ' + dayLocaleFile + '...')
  const fullDayLocaleFile = join(dayLocaleDirectory, dayLocaleFile)
  const dayLocale = readFileSync(fullDayLocaleFile, {encoding: 'utf-8'}).split('\n')
  const startFormats = findFormats(dayLocale)
  if (startFormats) {
    return warn('  Existing formats')
  }
  const momentLocaleFile = join(momentLocaleDirectory, dayLocaleFile)
  const momentLocale = readFileSync(momentLocaleFile, {encoding: 'utf-8'}).split('\n')
  const { startFormat, endFormat } = findLongDateFormat(momentLocale)
  if (!(startFormat && endFormat)) {
    fail('  Missing longDateFormat')
  }
  const startRelativeTime = findRelativeTime(dayLocale)
  if (!startRelativeTime) {
    return warn('  Missing relativeTime')
  }
  const longDateFormat = momentLocale.slice(startFormat, endFormat)
  let formats = convertFormats(longDateFormat)
  if (!formats) {
    fail('Unrecognized line: "' + localeLine + '"')
  }
  const newDayLocale = dayLocale.slice(0, startRelativeTime).concat('  formats: {')
    .concat(formats).concat('  },').concat(dayLocale.slice(startRelativeTime))
  writeFileSync(fullDayLocaleFile, newDayLocale.join('\n'))
}

readdirSync(dayLocaleDirectory).forEach(updateLocale)
