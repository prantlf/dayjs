import { zones, rules } from '../../../node_modules/tzdata/tzdata'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December']
const SHORT_MONTHS = {}
const SHORT_DAYS = {}
const EXACT_DATE_TIME = {}
// { 'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
//   'Jul': 6,, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11 }
for (let i = 0; i < MONTHS.length; i += 1) {
  SHORT_MONTHS[MONTHS[i].substr(0, 3)] = i
}
// { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 }
for (let i = 0; i < DAYS.length; i += 1) {
  SHORT_DAYS[DAYS[i].substr(0, 3)] = i
}

function getZone(date, timeZone) {
  const zoneList = zones[timeZone]
  if (zoneList.length === 0) {
    throw new Error(`No time zone zone found for "${timeZone}" on ${date}.`)
  }
  // Do backwards lookup since most use cases deal with newer dates.
  const utcTime = date.getTime()
  let i
  for (i = zoneList.length - 1; i >= 0; i -= 1) {
    const zoneTime = zoneList[i][3]
    if (zoneTime && utcTime > zoneTime) break
  }
  return zoneList[i + 1]
}

function findApplicableRules(year, ruleSet) {
  const applicableRules = []
  const ruleCount = ruleSet && ruleSet.length
  for (let i = 0; i < ruleCount; i += 1) {
    const rule = ruleSet[i]
    const firstYear = rule[0]
    const lastYear = rule[1]
    if (firstYear <= year && ( // Exclude future rules.
      lastYear >= year || // Date is in a set range.
      (firstYear === year && lastYear === 'only') || // Date is in an 'only' year.
      lastYear === 'max')) { // We're in a range from the start year to infinity.
      // It's completely okay to have any number of matches here.
      // Normally we should only see two, but that doesn't preclude other numbers of matches.
      // These matches are applicable to this year.
      applicableRules.push([year, rule])
    }
  }
  return applicableRules
}

function getAdjustedOffset(offset, minimum) {
  return -Math.ceil(minimum - offset)
}

function getRule(ruleDate, zone) {
  const basicOffset = zone[0]
  let ruleSet = zone[1]

  // Convert a date to UTC. Depending on the 'type' parameter, the date parameter may be:
  //
  // - `u`, `g`, `z`: already UTC (no adjustment).
  // - `s`: standard time (adjust for time zone offset but not for DST)
  // - `w`: wall clock time (adjust for both time zone and DST offset).
  //
  // DST adjustment is done using the rule given as third argument.
  function convertDateToUTC(date, type, rule) {
    let offset

    if (type === 'u' || type === 'g' || type === 'z') { // UTC
      offset = 0
    } else if (type === 's') { // Standard Time
      offset = basicOffset
    } else if (type === 'w' || !type) { // Wall Clock Time
      offset = getAdjustedOffset(basicOffset, rule[6])
    } else {
      throw new Error(`Unknown conversion type "${type}".`)
    }

    return new Date(date.getTime() + (offset * 60 * 1000))
  }

  // Step 1:  Find applicable rules for this year.
  // Step 2:  Sort the rules by effective date.
  // Step 3:  Check requested date to see if a rule has yet taken effect this year.  If not,
  // Step 4:  Get the rules for the previous year.  If there isn't an applicable rule for last
  //          year, then there probably is no current time offset since they seem to explicitly
  //          turn off the offset when someone stops observing DST.
  //          FIXME: if this is not the case and we'll walk all the way back (ugh).
  // Step 5:  Sort the rules by effective date.
  // Step 6:  Apply the most recent rule before the current time.
  function convertRuleToExactDateAndTime(yearAndRule, prevRule) {
    const year = yearAndRule[0]
    const rule = yearAndRule[1]
    // Assume that the rule applies to the year of the given date.

    const hms = rule[5]
    let effectiveDate

    if (!EXACT_DATE_TIME[year]) {
      EXACT_DATE_TIME[year] = {}
    }

    // Result for given parameters is already stored
    if (EXACT_DATE_TIME[year][rule]) {
      effectiveDate = EXACT_DATE_TIME[year][rule]
    } else {
      // If we have a specific date, use that!
      if (!Number.isNaN(rule[4])) {
        // eslint-disable-next-line function-paren-newline
        effectiveDate = new Date(Date.UTC(year, SHORT_MONTHS[rule[3]],
          // eslint-disable-next-line function-paren-newline
          rule[4], hms[0], hms[1], hms[2], 0))
      } else {
        // Let's hunt for the date.
        let targetDay
        let operator
        // Example: `lastThu`
        if (rule[4].substr(0, 4) === 'last') {
          // Start at the last day of the month and work backward.
          // eslint-disable-next-line function-paren-newline
          effectiveDate = new Date(Date.UTC(year, SHORT_MONTHS[rule[3]] + 1,
            // eslint-disable-next-line function-paren-newline
            1, hms[0] - 24, hms[1], hms[2], 0))
          targetDay = SHORT_DAYS[rule[4].substr(4, 3)]
          operator = '<='
        } else {
          // Example: `Sun>=15`
          // Start at the specified date.
          // eslint-disable-next-line function-paren-newline
          effectiveDate = new Date(Date.UTC(year, SHORT_MONTHS[rule[3]],
            // eslint-disable-next-line function-paren-newline
            rule[4].substr(5), hms[0], hms[1], hms[2], 0))
          targetDay = SHORT_DAYS[rule[4].substr(0, 3)]
          operator = rule[4].substr(3, 2)
        }
        const ourDay = effectiveDate.getUTCDay()
        // Go forwards.
        if (operator === '>=') {
          effectiveDate.setUTCDate(effectiveDate.getUTCDate() +
            ((targetDay - ourDay) + ((targetDay < ourDay) ? 7 : 0)))
        } else {
          // Go backwards. Looking for the last of a certain day, or operator is '<=' (less likely).
          effectiveDate.setUTCDate(effectiveDate.getUTCDate() +
            (targetDay - ourDay - ((targetDay > ourDay) ? 7 : 0)))
        }
      }
      EXACT_DATE_TIME[year][rule] = effectiveDate
    }

    // If previous rule is given, correct for the fact that the starting time of the current
    // rule may be specified in local time.
    if (prevRule) {
      effectiveDate = convertDateToUTC(effectiveDate, hms[3], prevRule)
    }
    return effectiveDate
  }

  function compareDates(a, b, prev) {
    let year
    let rule
    if (!(a instanceof Date)) {
      [year, rule] = a
      a = (!prev && EXACT_DATE_TIME[year] && EXACT_DATE_TIME[year][rule])
        ? EXACT_DATE_TIME[year][rule] : convertRuleToExactDateAndTime(a, prev)
    } else if (prev) {
      a = convertDateToUTC(a, 'u', prev)
    }
    if (!(b instanceof Date)) {
      [year, rule] = b
      b = (!prev && EXACT_DATE_TIME[year] && EXACT_DATE_TIME[year][rule])
        ? EXACT_DATE_TIME[year][rule] : convertRuleToExactDateAndTime(b, prev)
    } else if (prev) {
      b = convertDateToUTC(b, 'u', prev)
    }
    return Number(a) - Number(b)
  }

  // If the zone has a DST rule like '1:00', create a rule and return it
  // instead of looking it up in the parsed rules
  const staticDstMatch = ruleSet.match(/^([0-9]):([0-9][0-9])$/)
  if (staticDstMatch) {
    return [-1000000, 'max', '-', 'Jan', 1, [0, 0, 0],
      (parseInt(staticDstMatch[1], 10) * 60) + parseInt(staticDstMatch[2], 10), '-']
  }

  const year = ruleDate.getUTCFullYear()
  ruleSet = rules[ruleSet]

  let applicableRules = findApplicableRules(year, ruleSet)
  applicableRules.push(ruleDate)
  // While sorting, the time zone in which the rule starting time is specified
  // is ignored. This is ok as long as the timespan between two DST changes is
  // larger than the DST offset, which is probably always true.
  // As the given date may indeed be close to a DST change, it may get sorted
  // to a wrong position (off by one), which is corrected below.
  applicableRules.sort(compareDates)

  // If there are not enough past DST rules...
  if (applicableRules.indexOf(ruleDate) < 2) {
    applicableRules = applicableRules.concat(findApplicableRules(year - 1, ruleSet))
    applicableRules.sort(compareDates)
  }
  const pinpoint = applicableRules.indexOf(ruleDate)
  if (pinpoint > 1 &&
    compareDates(ruleDate, applicableRules[pinpoint - 1], applicableRules[pinpoint - 2][1]) < 0) {
    // The previous rule does not really apply, take the one before that.
    return applicableRules[pinpoint - 2][1]
  } else if (pinpoint > 0 && pinpoint < applicableRules.length - 1 &&
    compareDates(ruleDate, applicableRules[pinpoint + 1], applicableRules[pinpoint - 1][1]) > 0) {
    // The next rule does already apply, take that one.
    return applicableRules[pinpoint + 1][1]
  } else if (pinpoint === 0) {
    // No applicable rule found in this and in previous year.
    return null
  }
  return applicableRules[pinpoint - 1][1]
}

function getAbbreviation(zone, rule) {
  const base = zone[2]
  if (base.indexOf('%s') >= 0) {
    let repl
    if (rule) {
      repl = rule[7] === '-' ? '' : rule[7]
    } else {
      // FIXME: Right now just falling back to Standard --
      // apparently ought to use the last valid rule,
      // although in practice that always ought to be Standard
      repl = 'S'
    }
    return base.replace('%s', repl)
  } else if (base.indexOf('/') >= 0) {
    // Chose one of two alternative strings.
    let splitIndex
    if (rule) {
      splitIndex = rule[6] ? 1 : 0
    } else {
      splitIndex = 0
    }
    return base.split('/', 2)[splitIndex]
  }
  return base
}

function getTimeZoneInfo(date, timeZone) {
  // zone is something like `[ '-3:44:40', '-', 'LMT', '1911', 'May', '15', '' ]`
  // or `[ '-5:00', '-', 'EST', '1974', 'Apr', '28', '2:00' ]`
  const zone = getZone(date, timeZone)
  let offset = +zone[0]
  const rule = getRule(date, zone)
  if (rule) {
    offset = getAdjustedOffset(offset, rule[6])
  }
  const abbreviation = getAbbreviation(zone, rule)
  return { offset, abbreviation }
}

export default (o, C) => {
  const proto = C.prototype
  const oldParse = proto.parse
  const oldFormat = proto.format
  proto.parse = function (cfg) {
    oldParse.call(this, cfg)
    const { timeZone, parseTimeZone } = cfg
    if (timeZone) {
      let date = this.$d
      if (!parseTimeZone) {
        date = new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000))
        this.$d = date
      }
      try {
        const info = getTimeZoneInfo(date, timeZone)
        this.$z = info
        console.log(`Constructing date: ${date}, timeZone: ${timeZone}, parseTimeZone: ${parseTimeZone}, offset: ${info.offset}.`)
        date.setTime(date.getTime() + (info.offset * 60 * 1000))
      } catch (error) {
        console.warn(error) // eslint-disable-line no-console
        this.$d = new Date(Number.NaN)
      }
      this.init(cfg)
    } else {
      console.log(`Constructing date: ${this.$d}.`)
    }
  }
  proto.format = function (formatStr, options = {}) {
    if (typeof formatStr === 'object' && !(formatStr instanceof String)) {
      options = formatStr
      formatStr = undefined
    }
    const { timeZone } = options
    const date = timeZone ? new C({
      date: this.$d.getTime(),
      timeZone,
      parseTimeZone: true
    }) : this
    return oldFormat.call(date, formatStr, options)
  }
}

