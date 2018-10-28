import dayjs from 'dayjs-ext'

const locale = {
  name: 'sk',
  weekdays: 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
  months: 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_'),
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd D. MMMM YYYY H:mm'
  },
  relativeTime: {
    // Using 3 plural forms for 1, 2-4, 5-
    duration: {
      s: 'niekoľko sekúnd',
      m: 'minúta',
      mm: ['%d minúta', '%d minúty', '%d minút'],
      h: 'hodina',
      hh: ['%d hodina', '%d hodiny', '%d hodín'],
      d: 'deň',
      dd: ['%d deň', '%d dni', '%d dní'],
      M: 'mesiac',
      MM: ['%d mesiac', '%d mesiace', '%d mesiacov'],
      y: 'rok',
      yy: ['%d rok', '%d roky', '%d rokov']
    },
    future: {
      s: 'o niekoľko sekúnd',
      m: 'o minútu',
      mm: ['o %d minútu', 'o %d minúty', 'o %d minút'],
      h: 'o hodinu',
      hh: ['o %d hodinu', 'o %d hodiny', 'o %d hodín'],
      d: 'zajtra',
      dd: ['o %d deň', 'o %d dni', 'o %d dní'],
      M: 'o mesiac',
      MM: ['o %d mesiac', 'o %d mesiace', 'o %d mesiacov'],
      y: 'o rok',
      yy: ['o %d rok', 'o %d roky', 'o %d rokov']
    },
    past: {
      s: 'pred niekoľko sekundami',
      m: 'pred minútou',
      mm: ['pred %d minútou', 'pred %d minútami', 'pred %d minútami'],
      h: 'pred hodinou',
      hh: ['pred %d hodinou', 'pred %d hodinami', 'pred %d hodínami'],
      d: 'včera',
      dd: ['pred %d dňom', 'pred %d dňami', 'pred %d dňami'],
      M: 'pred mesiacom',
      MM: ['pred %d mesiacom', 'pred %d mesiacmi', 'pred %d mesiacmi'],
      y: 'vlani',
      yy: ['pred %d rokom', 'pred %d rokmi', 'pred %d rokmi']
    }
  },
  ordinal: n => `${n}º`
}

dayjs.locale(locale, null, true)

export default locale
