import MockDate from 'mockdate'
import moment from 'moment'
import dayjs from '../../src'
import timeZone from '../../src/plugin/timeZone'

dayjs.extend(timeZone)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Format empty string', () => {
  expect(dayjs().format()).toBe(moment().format())
})
