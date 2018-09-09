import MockDate from 'mockdate'
import moment from 'moment'
import dayjs from '../../src'
import utcMode from '../../src/plugin/utcMode'

dayjs.extend(utcMode)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

describe('Getters in UTC mode', () => {
  it('UTC Year', () => {
    expect(dayjs().utc().year()).toBe(moment().utc().year())
  })

  it('UTC Month', () => {
    expect(dayjs().utc().month()).toBe(moment().utc().month())
  })

  it('UTC Day of Week', () => {
    expect(dayjs().utc().day()).toBe(moment().utc().day())
  })

  it('UTC Date', () => {
    expect(dayjs().utc().date()).toBe(moment().utc().date())
  })

  it('UTC Hour', () => {
    expect(dayjs().utc().hour()).toBe(moment().utc().hour())
  })

  it('UTC Minute', () => {
    expect(dayjs().utc().minute()).toBe(moment().utc().minute())
  })

  it('UTC Second', () => {
    expect(dayjs().utc().second()).toBe(moment().utc().second())
  })

  it('UTC Millisecond', () => {
    expect(dayjs().utc().millisecond()).toBe(moment().utc().millisecond())
  })
})

describe('Setters in UTC mode', () => {
  it('Set UTC Day', () => {
    expect(dayjs().utc().set('date', 30).valueOf()).toBe(moment().utc().set('date', 30).valueOf())
  })

  it('Set UTC Day of Week', () => {
    expect(dayjs().utc().set('day', 0).valueOf()).toBe(moment().utc().set('day', 0).valueOf())
  })

  it('Set UTC Month', () => {
    expect(dayjs().utc().set('month', 11).valueOf()).toBe(moment().utc().set('month', 11).valueOf())
  })

  it('Set UTC Year', () => {
    expect(dayjs().utc().set('year', 2008).valueOf()).toBe(moment().utc().set('year', 2008).valueOf())
  })

  it('Set UTC Hour', () => {
    expect(dayjs().utc().set('hour', 6).valueOf()).toBe(moment().utc().set('hour', 6).valueOf())
  })

  it('Set UTC Minute', () => {
    expect(dayjs().utc().set('minute', 59).valueOf()).toBe(moment().utc().set('minute', 59).valueOf())
  })

  it('Set UTC Second', () => {
    expect(dayjs().utc().set('second', 59).valueOf()).toBe(moment().utc().set('second', 59).valueOf())
  })

  it('Set UTC Millisecond', () => {
    expect(dayjs().utc().set('millisecond', 999).valueOf()).toBe(moment().utc().set('millisecond', 999).valueOf())
  })
})

it('StartOf EndOf Year ... in UTC mode', () => {
  const testArr = ['year', 'month', 'day', 'date', 'week', 'hour', 'minute', 'second']
  testArr.forEach((d) => {
    expect(dayjs().utc().startOf(d).valueOf()).toBe(moment().utc().startOf(d).valueOf())
    expect(dayjs().utc().endOf(d).valueOf()).toBe(moment().utc().endOf(d).valueOf())
  })
})

describe('Parsing in constructor in UTC mode', () => {
  it('Recognizes the UTC flag in constructor options', () => {
    const instance = dayjs('2018-09-06', { utc: true })
    expect(instance.$u).toBeTruthy()
    expect(instance.hour()).toEqual(0)
    expect(instance.minute()).toEqual(0)
  })

  it('Does not apply the UTC mode by default', () => {
    const instance = dayjs('2018-09-06 19:34:28.657', {})
    expect(instance.$u).toBeFalsy()
    expect(instance.hour()).toEqual(19)
    expect(instance.minute()).toEqual(34)
  })
})

it('Formats an UTC instance to UTC', () => {
  const instance = dayjs('2018-09-06T19:34:28Z', { utc: true })
  expect(instance.format()).toEqual('2018-09-06T19:34:28+00:00')
})

describe('isUTC', () => {
  it('Returns false by default', () => {
    const instance = dayjs()
    expect(instance.isUTC()).toBeFalsy()
  })

  it('Returns true for UTC instances', () => {
    const instance = dayjs(undefined, { utc: true })
    expect(instance.isUTC()).toBeTruthy()
  })
})

describe('utc', () => {
  it('Returns a new instance', () => {
    const instance = dayjs('2018-09-06T19:34:28.657Z')
    const utc = instance.utc()
    expect(utc).not.toBe(instance)
  })

  it('Returns an UTC instance', () => {
    const instance = dayjs('2018-09-06T19:34:28.657Z').utc()
    expect(instance.$u).toBeTruthy()
    expect(instance.hour()).toEqual(19)
    expect(instance.minute()).toEqual(34)
  })
})

describe('local', () => {
  it('Returns a new instance', () => {
    const instance = dayjs('2018-09-06T19:34:28.657Z')
    const local = instance.local()
    expect(local).not.toBe(instance)
  })

  it('Returns a local instance', () => {
    const instance = dayjs('2018-09-06 19:34:28.657').local()
    expect(instance.$u).toBeFalsy()
    expect(instance.hour()).toEqual(19)
    expect(instance.minute()).toEqual(34)
  })
})

describe('utcOffset', () => {
  it('Returns the UTC offset for local instances', () => {
    const instance = dayjs('2018-09-06T19:34:28.657Z')
    const date = instance.toDate()
    expect(instance.utcOffset()).toEqual(date.getTimezoneOffset())
  })

  it('Returns zero for UTC instances', () => {
    const instance = dayjs(undefined, { utc: true })
    expect(instance.utcOffset()).toEqual(0)
  })
})
