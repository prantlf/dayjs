import * as C from '../../constant'
import U from '../../utils'

const utcDatePartSetters = {
  year: 'setUTCFullYear',
  month: 'setUTCMonth',
  date: 'setUTCDate',
  day: 'setUTCDate',
  hour: 'setUTCHours',
  minute: 'setUTCMinutes',
  second: 'setUTCSeconds',
  millisecond: 'setUTCMilliseconds'
}

const utcTimePartSetters = [
  'setUTCHours', 'setUTCMinutes', 'setUTCSeconds', 'setUTCMilliseconds'
]

export default (o, c, dayjs) => { // locale needed later
  const proto = c.prototype
  const oldCreateFullDate = U.createFullDate
  const oldCreateDateOnly = U.createDateOnly
  const oldGetDatePartSetter = U.getDatePartSetter
  const oldGetTimePartSetters = U.getTimePartSetters
  const oldInit = proto.init
  const oldFormat = proto.format
  U.wrapper = (date, instance) => dayjs(date, { locale: instance.$L, utc: instance.$u })
  U.createFullDate = (cfg, year, month, day, hours, minutes, seconds, milliseconds) => {
    const { utc } = cfg
    return utc
      ? new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds))
      : oldCreateFullDate(cfg, year, month, day, hours, minutes, seconds, milliseconds)
  }
  U.createDateOnly = (instance, year, month, day) =>
    (instance.$u
      ? new Date(Date.UTC(year, month, day))
      : oldCreateDateOnly(instance, year, month, day))
  U.getDatePartSetter = (instance, unit) =>
    (instance.$u ? utcDatePartSetters[unit] : oldGetDatePartSetter(instance, unit))
  U.getTimePartSetters = (instance) => // eslint-disable-line arrow-parens
    (instance.$u ? utcTimePartSetters : oldGetTimePartSetters(instance))
  proto.init = function (cfg) {
    if (cfg && cfg.utc) {
      const date = this.$d
      this.$y = date.getUTCFullYear()
      this.$M = date.getUTCMonth()
      this.$D = date.getUTCDate()
      this.$W = date.getUTCDay()
      this.$H = date.getUTCHours()
      this.$m = date.getUTCMinutes()
      this.$s = date.getUTCSeconds()
      this.$ms = date.getUTCMilliseconds()
      this.$L = this.$L || U.parseLocale(cfg.locale, null, true) || U.L
      this.$u = true
    } else {
      oldInit.call(this, cfg)
    }
  }
  proto.format = function (formatStr) {
    const str = formatStr || C.FORMAT_DEFAULT
    const zoneStr = this.$u ? '+00:00' : U.padZoneStr(this.$d.getTimezoneOffset())
    const result = str.replace(/ZZ?/g, (match) => {
      switch (match) {
        case 'Z':
          return zoneStr
        default: // 'ZZ'
          return zoneStr.replace(':', '')
      }
    })
    return oldFormat.call(this, result)
  }
  proto.isUTC = function () {
    return this.$u
  }
  proto.utc = function () {
    return dayjs(this.$d.valueOf(), { locale: this.$L, utc: true })
  }
  proto.local = function () {
    return dayjs(this.$d.valueOf(), { locale: this.$L, utc: false })
  }
  proto.utcOffset = function () {
    return this.$u ? 0 : this.$d.getTimezoneOffset()
  }
}
