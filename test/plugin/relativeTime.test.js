import MockDate from 'mockdate'
import moment from 'moment'
import dayjs from '../../src'
import relativeTime from '../../src/plugin/relativeTime'
import '../../src/locale/cs'

dayjs.extend(relativeTime)

beforeEach(() => {
  MockDate.set(new Date('2018-04-04T16:00:00.000Z'))
})

afterEach(() => {
  MockDate.reset()
})

it('Upgrades old locale objects', () => {
  const old = {
    name: 'old-relativeTime',
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      m: 'a minute',
      mm: '%d minutes',
      hh: '%d hours',
      h: 'an hour',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    }
  }
  dayjs.locale(old, null, true)
  const locale = dayjs(undefined, { locale: 'old-relativeTime' }).$locale()
  // Call the plugin to upgrade the locale structure on the fly
  dayjs(undefined, { locale: 'old-relativeTime' }).fromNow()
  // The locale has been upgraded to the new locale structure
  expect(locale.relativeTime.s).toBeUndefined()
  expect(typeof locale.relativeTime.duration).toEqual('object')
  expect(typeof locale.relativeTime.duration.m).toEqual('string')
  expect(Array.isArray([locale.relativeTime.duration.mm])).toBeTruthy()
  expect(locale.relativeTime.duration.mm.length).toEqual(2)
  expect(typeof locale.relativeTime.duration.mm[0]).toEqual('string')
  expect(typeof locale.relativeTime.duration.mm[1]).toEqual('string')
})

it('Time from X', () => {
  const T = [
    [0, 'second'], // a few seconds
    [44, 'second'], // a few seconds
    [45, 'second'], // a minute
    [89, 'second'], // a minute
    [90, 'second'], // 2 minutes
    [44, 'minute'], // 44 minutes
    [45, 'minute'], // an hour
    [89, 'minute'], // an hour
    [90, 'minute'], // 2 hours
    [21, 'hour'], // 21 hours
    [22, 'hour'], // a day
    [35, 'hour'], // a day
    [36, 'hour'], // 2 days
    [25, 'day'], // 25 days
    [26, 'day'], // a month
    [45, 'day'], // a month
    [47, 'day'], // 2 month
    [10, 'month'], // 2 month
    [11, 'month'], // a year
    [17, 'month'], // a year
    [18, 'month'] // 2 years
  ]

  T.forEach((t) => {
    expect(dayjs().from(dayjs().add(t[0], t[1]))).toBe(moment().from(moment().add(t[0], t[1])))
  })
  // withoutSuffix
  expect(dayjs().from(dayjs().add(3, 'year'), true)).toBe(moment().from(moment().add(3, 'year'), true))
  // past date
  expect(dayjs().from(dayjs().subtract(3, 'year'))).toBe(moment().from(moment().subtract(3, 'year')))
})

it('Time from now', () => {
  expect(dayjs().fromNow()).toBe(moment().fromNow())
  expect(dayjs().fromNow(true)).toBe(moment().fromNow(true))
})

it('Time to now', () => {
  expect(dayjs().toNow()).toBe(moment().toNow())
  expect(dayjs().toNow(true)).toBe(moment().toNow(true))
})

it('Time to X', () => {
  // withoutSuffix
  expect(dayjs().to(dayjs().add(3, 'year'), true)).toBe(moment().to(moment().add(3, 'year'), true))
  // past date
  expect(dayjs().to(dayjs().subtract(3, 'year'))).toBe(moment().to(moment().subtract(3, 'year')))
})

it('Makes use of a singular rule', () => {
  expect(dayjs(undefined).from(dayjs().subtract(1, 'minutes'))).toBe('in a minute')
})

it('Makes use of a numbered plural rule', () => {
  expect(dayjs(undefined, { locale: 'cs' }).from(dayjs().subtract(30, 'minutes'))).toBe('za 30 minut')
})

it('Makes use of a plural rule provided as a custom function', () => {
  expect(dayjs().from(dayjs().subtract(30, 'minutes'))).toBe('in 30 minutes')
})
