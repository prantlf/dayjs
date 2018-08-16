import dayjs from 'dayjs'

const locale = {
  name: 'sk',
  weekdays: 'Pondelok_Utorok_Streda_Štvrtok_Piatok_Sobota_Nedeľa'.split('_'),
  months: 'Január_Február_Marec_Apríl_Máj_Jún_Júl_August_September_Október_November_December'.split('_'),
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd D. MMMM YYYY H:mm'
  },
  relativeTime: {
    duration: {
      s: 'niekoľko sekúnd',
      m: 'minúta',
      mm: '%d minúty',
      mmm: '%d minút',
      h: 'hodina',
      hh: '%d hodiny',
      hhh: '%d hodín',
      d: 'deň',
      dd: '%d dni',
      ddd: '%d dní',
      M: 'mesiac',
      MM: '%d mesiace',
      MMM: '%d mesiacov',
      y: 'rok',
      yy: '%d roky',
      yyy: '%d rokov'
    },
    future: {
      s: 'o niekoľko sekúnd',
      m: 'o minútu',
      mm: 'o %d minúty',
      mmm: 'o %d minút',
      h: 'o hodinu',
      hh: 'o %d hodiny',
      hhh: 'o %d hodín',
      d: 'zajtra',
      dd: 'o %d dni',
      ddd: 'o %d dní',
      M: 'o mesiac',
      MM: 'o %d mesiace',
      MMM: 'o %d mesiacov',
      y: 'o rok',
      yy: 'o %d roky',
      yyy: 'o %d rokov'
    },
    past: {
      s: 'pred niekoľko sekundami',
      m: 'pred minútou',
      mm: 'pred %d minútami',
      mmm: 'pred %d minútami',
      h: 'pred hodinou',
      hh: 'pred %d hodinami',
      hhh: 'pred %d hodínami',
      d: 'včera',
      dd: 'pred %d dňami',
      ddd: 'pred %d dňami',
      M: 'pred mesiacom',
      MM: 'pred %d mesiacmi',
      MMM: 'pred %d mesiacmi',
      y: 'vlani',
      yy: 'pred %d rokmi',
      yyy: 'pred %d rokmi'
    }
  },
  ordinal: n => `${n}º`
}

dayjs.locale(locale, null, true)

export default locale
