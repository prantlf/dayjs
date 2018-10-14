import MockDate from 'mockdate'
import moment from 'moment'
import dayjs from '../../src'
import es from '../../src/locale/es'
import customParseFormat from '../../src/plugin/customParseFormat'
import localizableFormat from '../../src/plugin/localizableFormat'

dayjs.extend(customParseFormat)
dayjs.extend(localizableFormat)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('does not break the built-in parsing', () => {
  const input = '2018-05-02 01:02:03.004'
  expect(dayjs(input).valueOf()).toBe(moment(input).valueOf())
})

it('does not break the non-localizable parsing', () => {
  const input = '2.5.18'
  const format = 'D.M.YY'
  expect(dayjs(input, { format }).valueOf()).toBe(moment(input, format).valueOf())
})

it('parses English L', () => {
  const input = '05/02/2018'
  const format = 'L'
  expect(dayjs(input, { format }).valueOf()).toBe(moment(input, format).valueOf())
})

it('parses English LT', () => {
  const input = '05/02/2018 12:31 PM'
  const format = 'L LT'
  expect(dayjs(input, { format }).valueOf()).toBe(moment(input, format).valueOf())
})

it('parses English LTS', () => {
  const input = '05/02/2018 12:31:32 PM'
  const format = 'L LTS'
  expect(dayjs(input, { format }).valueOf()).toBe(moment(input, format).valueOf())
})

it('parses Spanish L with locale es object', () => {
  const input = '02/05/2018'
  const format = 'L'
  const date = new Date(2018, 4, 2)
  expect(dayjs(input, { format, locale: es }).valueOf()).toBe(date.valueOf())
})

it('parses Spanish LT with locale es string', () => {
  const input = '02/05/2018 12:31'
  const format = 'L LT'
  const date = new Date(2018, 4, 2, 12, 31)
  expect(dayjs(input, { format, locale: 'es' }).valueOf()).toBe(date.valueOf())
})

it('parses Spanish LTS with the global locale', () => {
  const input = '02/05/2018 12:31:32'
  const format = 'L LTS'
  const expectedDate = new Date(2018, 4, 2, 12, 31, 32)
  dayjs.locale('es');
  const actualDate = dayjs(input, { format })
  dayjs.locale('en')
  expect(actualDate.valueOf()).toBe(expectedDate.valueOf())
})
