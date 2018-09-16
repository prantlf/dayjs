const moment = require('moment-timezone')
const dayjs = require('..')
const timeZone = require('../plugin/timeZone')
const { createSuite, runSuites } = require('./benchmark')

dayjs.extend(timeZone)

const momentDate = moment('2018-09-15T12:58:07.123Z')
const dayjsDate = dayjs('2018-09-15T12:58:07.123Z')

const input = '2018-09-15 14:58:07.123'
const zone = 'Europe/Berlin'
const customFormat = 'D.M.YYYY h:mm:ss.SSS A [GMT]Z (z)'

const parseSuite = createSuite('parse from a time zone')
  .add('Moment.js', () => moment.tz(input, zone))
  .add('Day.js', () => dayjs(input, { timeZone: zone }))

const defaultFormatSuite = createSuite('format to a time zone using a default format')
  .add('Moment.js', () => momentDate.tz(zone).format())
  .add('Day.js', () => dayjsDate.format(undefined, { timeZone: zone }))

const customFormatSuite = createSuite('format to a time zone using a custom format')
  .add('Moment.js', () => momentDate.tz(zone).format(customFormat))
  .add('Day.js', () => dayjsDate.format(customFormat, { timeZone: zone }))

runSuites([parseSuite, defaultFormatSuite, customFormatSuite])
