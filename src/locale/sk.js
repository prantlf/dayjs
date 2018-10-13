import dayjs from 'dayjs'

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
    // 3 plural forms for 1, 2-4, 5-
    pluralRule: 8,
    duration: {
      s: ['niekoľko sekúnd'],
      m: ['minúta', '%d minúty', '%d minút'],
      h: ['hodina', '%d hodiny', '%d hodín'],
      d: ['deň', '%d dni', '%d dní'],
      M: ['mesiac', '%d mesiace', '%d mesiacov'],
      y: ['rok', '%d roky', '%d rokov']
    },
    future: {
      s: ['o niekoľko sekúnd'],
      m: ['o minútu', 'o %d minúty', 'o %d minút'],
      h: ['o hodinu', 'o %d hodiny', 'o %d hodín'],
      d: ['zajtra', 'o %d dni', 'o %d dní'],
      M: ['o mesiac', 'o %d mesiace', 'o %d mesiacov'],
      y: ['o rok', 'o %d roky', 'o %d rokov']
    },
    past: {
      s: ['pred niekoľko sekundami'],
      m: ['pred minútou', 'pred %d minútami', 'pred %d minútami'],
      h: ['pred hodinou', 'pred %d hodinami', 'pred %d hodínami'],
      d: ['včera', 'pred %d dňami', 'pred %d dňami'],
      M: ['pred mesiacom', 'pred %d mesiacmi', 'pred %d mesiacmi'],
      y: ['vlani', 'pred %d rokmi', 'pred %d rokmi']
    }
  },
  ordinal: n => `${n}º`
}

dayjs.locale(locale, null, true)

export default locale
