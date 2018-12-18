import { getPluralFormForCardinalByLocale } from 'fast-plural-rules'

import * as C from '../../constant'

export default (o, c, d) => {
  const proto = c.prototype
  d.en.relativeTime = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  }
  // Upgrades the original locale format with the single plural only
  // {
  //   future: '...', past: '..,',
  //   s: '...', m: '...', mm: '...'
  // }
  function upgradeSimpleLocale(loc) {
    // Save wrapper expressions with prepositions
    const { future, past } = loc
    // Prepare localized expressions for durations (neither future nor past)
    const durations = Object.keys(loc).reduce((result, key) => {
      const kl = key.length
      // Skip entries in the locale, which do not format numerals (future and past)
      if (kl <= 2) {
        // Save the special singular without any number with the single-letter key and the
        // single plural to be used with any number greater then 1 with the two-letter key
        const text = loc[key]
        if (kl === 1) {
          result[key] = text
          // Insert singular for objects with plurals declared before singulars
          const key2 = key + key
          let plurals = result[key2]
          if (!plurals) {
            plurals = result[key2] = [] // eslint-disable-line no-multi-assign
          }
          plurals.unshift(text)
        } else {
          // Append plural for objects with plurals declared after singulars
          let plurals = result[key]
          if (!plurals) {
            plurals = result[key] = [] // eslint-disable-line no-multi-assign
          }
          plurals.push(text)
        }
      }
      // Remove the original locale entry; the original locale object needs
      // to be retained to prevent upgrading on every formatting call
      delete loc[key]
      return result
    }, {})
    // Prepare localized expressions for future and past
    const futures = {}
    const pasts = {}
    Object.keys(durations).forEach((key) => {
      const value = durations[key]
      if (typeof value === 'string') {
        // Handle singular texts
        futures[key] = future.replace('%s', value)
        pasts[key] = past.replace('%s', value)
      } else {
        // Handle plural texts
        futures[key] = value.map(pluralForm => future.replace('%s', pluralForm))
        pasts[key] = value.map(pluralForm => past.replace('%s', pluralForm))
      }
    })
    // Set localized expressions for durations, future and past to the locale
    loc.duration = durations
    loc.future = futures
    loc.past = pasts
  }
  // Upgrades old locale format to provide compatibility with older
  // localizations; the grammar may not be correct for fusional languages
  // {
  //   duration: { s: '...', m: '...', mm: ['...', '...', ...] },
  //   future: { ... }, past: { ... }
  // }
  function upgradeLocale(loc) {
    // Do not upgrade already upgraded locales
    if (loc.s) {
      upgradeSimpleLocale(loc)
    }
  }
  const fromTo = (input, withoutSuffix, instance, isFrom) => {
    const locale = instance.$locale()
    const locs = locale.relativeTime
    const T = [
      { l: 's', r: 44, d: C.S },
      { l: 'm', r: 89 },
      { l: 'mm', r: 44, d: C.MIN },
      { l: 'h', r: 89 },
      { l: 'hh', r: 21, d: C.H },
      { l: 'd', r: 35 },
      { l: 'dd', r: 25, d: C.D },
      { l: 'M', r: 45 },
      { l: 'MM', r: 10, d: C.M },
      { l: 'y', r: 17 },
      { l: 'yy', d: C.Y }
    ]
    const Tl = T.length
    let result
    let out

    upgradeLocale(locs)

    for (let i = 0; i < Tl; i += 1) {
      const t = T[i]
      const unit = t.d
      if (unit) {
        result = isFrom
          ? d(input).diff(instance, unit, true)
          : instance.diff(input, unit, true)
      }
      const abs = Math.ceil(Math.abs(result))
      const limit = t.r
      if (abs <= limit || !limit) {
        let loc
        // Use the proper source of localization expressions depending
        // on the requested expression - just duration, future or past
        if (withoutSuffix) {
          loc = locs.duration
        } else if (result > 0) {
          loc = locs.future
        } else {
          loc = locs.past
        }
        const key = t.l
        if (key.length === 1) {
          // Handle singular using a special text without any number
          out = loc[key].replace('%d', 1)
        } else {
          // Choose the plural form using the index decided by the plural rule
          const pluralForms = loc[key]
          const pluralForm = getPluralFormForCardinalByLocale(locale.name, abs)
          out = pluralForms[pluralForm].replace('%d', abs)
        }
        break
      }
    }
    return out
  }
  proto.to = function (input, withoutSuffix) {
    return fromTo(input, withoutSuffix, this, true)
  }
  proto.from = function (input, withoutSuffix) {
    return fromTo(input, withoutSuffix, this)
  }
  proto.toNow = function (withoutSuffix) {
    return this.to(d(), withoutSuffix)
  }
  proto.fromNow = function (withoutSuffix) {
    return this.from(d(), withoutSuffix)
  }
}
