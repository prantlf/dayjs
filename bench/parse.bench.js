const { createSuite, runSuites } = require('./benchmark')

const moment = require('moment')
const datefnsParse = require('date-fns/parse')
const dayjs = require('..')

const customParseFormat = require('../plugin/customParseFormat')
dayjs.extend(customParseFormat)

const scenarios = [
  { input: new Date(), label: 'Date' },
  { input: new Date().valueOf(), label: 'timestamp' },
  { input: '2018-09-15T12:58:07.123Z', label: 'string in ISO 8601' },
  { input: '2018-09-15 14:58:07.123', label: 'string in the local time zone' }
]

const customInput = '15.9.2018 2:58:07.123 PM GMT+02:00 (CEST)'
const customFormat = 'D.M.YYYY h:mm:ss.SSS A [GMT]Z (z)'

function parseDate(input) {
  return new Date(input)
}

function parseDateFnsDate(input, format) {
  const output = new Date(0)
  datefnsParse(input, format, output)
  return output
}

const suites = scenarios.map(({ input, label }) =>
  createSuite(`create from ${label}`)
    .add('Moment.js', () => moment(input))
    .add('Day.js', () => dayjs(input))
    .add('Date', () => parseDate(input)))

const customParseSuite = createSuite(`create from a custom-formatted string`)
    .add('Moment.js', () => moment(customInput, customFormat))
    .add('date-fns', () => parseDateFnsDate(customInput, customFormat))
    .add('Day.js', () => dayjs(customInput, { format: customFormat }))

runSuites(suites.concat(customParseSuite))
