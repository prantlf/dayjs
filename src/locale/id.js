import dayjs from 'dayjs-ext'

const locale = {
  name: 'id',
  weekdays: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
  months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
  formats: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY [pukul] HH.mm',
    LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
  },
  relativeTime: {
    future: 'dalam %s',
    past: '%s yang lalu',
    s: 'beberapa detik',
    m: '%d menit',
    mm: '',
    h: '%d jam',
    hh: '',
    d: '%d hari',
    dd: '',
    M: '%d bulan',
    MM: '',
    y: '%d tahun',
    yy: ''
  },
  ordinal: n => `${n}.`
}

dayjs.locale(locale, null, true)

export default locale
