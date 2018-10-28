import dayjs from 'dayjs'

const locale = {
  name: 'uk',
  weekdays: 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
  weekdaysShort: 'ндл_пнд_втр_срд_чтв_птн_сбт'.split('_'),
  weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
  months: 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_'),
  monthsShort: 'сiч_лют_бер_квiт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY р.',
    LLL: 'D MMMM YYYY р., H:mm',
    LLLL: 'dddd, D MMMM YYYY р., H:mm'
  },
  relativeTime: {
    // Using 3 plural forms for 1 and x1, 2-4 and x2-4, 5-
    duration: {
      s: 'кілька секунд',
      m: 'хвилина',
      mm: ['%d хвилина', '%d хвилини', '%d хвилин'],
      h: 'година',
      hh: ['%d година', '%d години', '%d годин'],
      d: 'день',
      dd: ['%d день', '%d дні', '%d днів'],
      M: 'місяць',
      MM: ['%d місяць', '%d місяці', '%d місяців'],
      y: 'рік',
      yy: ['%d рік', '%d роки', '%d років']
    },
    future: {
      s: 'за кілька секунд',
      m: 'за хвилину',
      mm: ['за %d хвилину', 'за %d хвилини', 'за %d хвилин'],
      h: 'за годину',
      hh: ['за %d годину', 'за %d години', 'за %d годин'],
      d: 'завтра',
      dd: ['за %d день', 'за %d дні', 'за %d днів'],
      M: 'за місяць',
      MM: ['за %d місяць', 'за %d місяці', 'за %d місяців'],
      y: 'за рік',
      yy: ['за %d рік', 'за %d роки', 'за %d років']
    },
    past: {
      s: 'кілька секунд тому',
      m: 'хвилину тому',
      mm: ['%d хвилину тому', '%d хвилини тому', '%d хвилин тому'],
      h: 'годину тому',
      hh: ['%d годину тому', '%d години тому', '%d годин тому'],
      d: 'вчора',
      dd: ['%d день тому', '%d дні тому', '%d днів тому'],
      M: 'місяць тому',
      MM: ['%d місяць тому', '%d місяці тому', '%d місяців тому'],
      y: 'в минулому році',
      yy: ['%d рік тому', '%d роки тому', '%d років тому']
    }
  },
  ordinal: n => n
}

dayjs.locale(locale, null, true)

export default locale