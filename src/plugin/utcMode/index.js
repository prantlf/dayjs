import * as C from '../../constant'
import U from '../../utils'

const parseDate = (cfg) => {
  const { date } = cfg
  let reg
  if (date === null) return new Date(NaN) // Treat null as an invalid date
  if (U.isUndefined(date)) return new Date()
  if (date instanceof Date) return date
  // eslint-disable-next-line no-cond-assign
  if (typeof date === 'string'
    && date[date.length - 1] !== 'Z'
    && (reg = date.match(C.REGEX_PARSE))) {
    const year = reg[1]
    const month = reg[2] - 1
    const day = reg[3] || 1
    const hours = reg[5] || 0
    const minutes = reg[6] || 0
    const seconds = reg[7] || 0
    const milliseconds = reg[8] || 0
    return cfg && cfg.utc
      ? new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds))
      : new Date(year, month, day, hours, minutes, seconds, milliseconds)
  }
  return new Date(date)
}

export default (o, c, dayjs) => { // locale needed later
  U.wrapper = (date, instance) => dayjs(date, { locale: instance.$L, utc: instance.$u })
  const proto = c.prototype
  const oldFormat = proto.format
  proto.parse = function (cfg) {
    this.$d = parseDate(cfg)
    this.init(cfg)
  }
  proto.init = function (cfg) {
    const utc = cfg && !!cfg.utc
    const date = this.$d
    this.$u = utc
    if (utc) {
      this.$y = date.getUTCFullYear()
      this.$M = date.getUTCMonth()
      this.$D = date.getUTCDate()
      this.$W = date.getUTCDay()
      this.$H = date.getUTCHours()
      this.$m = date.getUTCMinutes()
      this.$s = date.getUTCSeconds()
      this.$ms = date.getUTCMilliseconds()
    } else {
      this.$y = date.getFullYear()
      this.$M = date.getMonth()
      this.$D = date.getDate()
      this.$W = date.getDay()
      this.$H = date.getHours()
      this.$m = date.getMinutes()
      this.$s = date.getSeconds()
      this.$ms = date.getMilliseconds()
    }
    this.$L = this.$L || U.parseLocale(cfg.locale, null, true) || U.L
  }
  proto.startOf = function (units, startOf) { // startOf -> endOf
    const isStartOf = !U.isUndefined(startOf) ? startOf : true
    const unit = U.prettyUnit(units)
    const setMethods = this.$u
      ? ['setUTCHours', 'setUTCMinutes', 'setUTCSeconds', 'setUTCMilliseconds']
      : ['setHours', 'setMinutes', 'setSeconds', 'setMilliseconds']
    const instanceFactory = (d, m) => {
      const date = this.$u
        ? new Date(Date.UTC(this.$y, m, d))
        : new Date(this.$y, m, d)
      const ins = U.wrapper(date, this)
      return isStartOf ? ins : ins.endOf(C.D)
    }
    const instanceFactorySet = (slice) => {
      const argumentStart = [0, 0, 0, 0]
      const argumentEnd = [23, 59, 59, 999]
      return U.wrapper(this.toDate()[setMethods[slice]].apply( // eslint-disable-line prefer-spread
        this.toDate(),
        isStartOf ? argumentStart.slice(slice) : argumentEnd.slice(slice)
      ), this)
    }
    switch (unit) {
      case C.Y:
        return isStartOf ? instanceFactory(1, 0) :
          instanceFactory(31, 11)
      case C.M:
        return isStartOf ? instanceFactory(1, this.$M) :
          instanceFactory(0, this.$M + 1)
      case C.W:
        return isStartOf ? instanceFactory(this.$D - this.$W, this.$M) :
          instanceFactory(this.$D + (6 - this.$W), this.$M)
      case C.D:
      case C.DATE:
        return instanceFactorySet(0)
      case C.H:
        return instanceFactorySet(1)
      case C.MIN:
        return instanceFactorySet(2)
      case C.S:
        return instanceFactorySet(3)
      default:
        return this.clone()
    }
  }
  proto.$set = function (units, int) { // private set
    const unit = U.prettyUnit(units)
    const setMethods = this.$u
      ? {
        year: 'setUTCFullYear',
        month: 'setUTCMonth',
        date: 'setUTCDate',
        hours: 'setUTCHours',
        minutes: 'setUTCMinutes',
        seconds: 'setUTCSeconds',
        milliseconds: 'setUTCMilliseconds'
      }
      : {
        year: 'setFullYear',
        month: 'setMonth',
        date: 'setDate',
        hours: 'setHours',
        minutes: 'setMinutes',
        seconds: 'setSeconds',
        milliseconds: 'setMilliseconds'
      }
    switch (unit) {
      case C.D:
        this.$d[setMethods.date](this.$D + (int - this.$W))
        break
      case C.DATE:
        this.$d[setMethods.date](int)
        break
      case C.M:
        this.$d[setMethods.month](int)
        break
      case C.Y:
        this.$d[setMethods.year](int)
        break
      case C.H:
        this.$d[setMethods.hours](int)
        break
      case C.MIN:
        this.$d[setMethods.minutes](int)
        break
      case C.S:
        this.$d[setMethods.seconds](int)
        break
      case C.MS:
        this.$d[setMethods.milliseconds](int)
        break
      default:
        break
    }
    this.init()
    return this
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
