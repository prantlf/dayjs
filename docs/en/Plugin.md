# Plugin List

A plugin is an independent module that can be added to Day.js to extend functionality or add new features.

By default, Day.js comes with core code only and no installed plugin.

You can load multiple plugins based on your need.

## API

#### Extend

* Returns dayjs

Use a plugin.

```js
import plugin
dayjs.extend(plugin)
dayjs.extend(plugin, options) // with plugin options
```

## Installation

* Via NPM:

```javascript
import dayjs from 'dayjs-ext'
import advancedFormat from 'dayjs-ext/plugin/advancedFormat' // load on demand

dayjs.extend(advancedFormat) // use plugin
```

* Via CDN:
```html
<script src="https://unpkg.com/dayjs-ext"></script>
<!-- Load plugin as window.dayjs_plugin_NAME -->
<script src="https://unpkg.com/dayjs-ext/plugin/advancedFormat"></script>
<script>
  dayjs.extend(dayjs_plugin_advancedFormat);
</script>
```

## List of official plugins

### AdvancedFormat
 - AdvancedFormat extends `dayjs().format` API to supply more format options.

```javascript
import advancedFormat from 'dayjs-ext/plugin/advancedFormat'

dayjs.extend(advancedFormat)

dayjs().format('Q Do k kk X x')
```

List of added formats:

| Format | Output           | Description                           |
| ------ | ---------------- | ------------------------------------- |
| `Q`    | 1-4              | Quarter                               |
| `Do`   | 1st 2nd ... 31st | Day of Month with ordinal             |
| `k`    | 1-23             | The hour, beginning at 1              |
| `kk`   | 01-23            | The hour, 2-digits, beginning at 1    |
| `X`    | 1360013296       | Unix Timestamp in second              |
| `x`    | 1360013296123    | Unix Timestamp in millisecond         |

### LocalizableFormat
 - LocalizableFormat extends `dayjs().format` API to supply localizable format options known from Moment.js.

```javascript
import localizableFormat from 'dayjs-ext/plugin/localizableFormat'

dayjs.extend(localizableFormat)

dayjs().format('L LT')
```

List of added formats:

| Format | Sample Output                     |
| ------ | --------------------------------- |
| `LT`   | 8:02 PM                           |
| `LTS`  | 8:02:18 PM                        |
| `L`    | 08/16/2018                        |
| `LL`   | August 16, 2018                   |
| `LLL`  | August 16, 2018 8:02 PM           |
| `LLLL` | Thursday, August 16, 2018 8:02 PM |

### RelativeTime
 - RelativeTime adds `.from` `.to` `.fromNow` `.toNow` APIs to formats date to relative time strings (e.g. 3 hours ago).

```javascript
import relativeTime from 'dayjs-ext/plugin/relativeTime'

dayjs.extend(relativeTime)

dayjs().from(dayjs('1990')) // 2 years ago
dayjs().from(dayjs(), true) // 2 years

dayjs().fromNow()

dayjs().to(dayjs())

dayjs().toNow()
```

#### Time from now `.fromNow(withoutSuffix?: boolean)`

Returns the `string` of relative time from now.

#### Time from X  `.from(compared: Dayjs, withoutSuffix?: boolean)`

Returns the `string` of relative time from X.

#### Time to now `.toNow(withoutSuffix?: boolean)`

Returns the `string` of relative time to now.

#### Time to X  `.to(compared: Dayjs, withoutSuffix?: boolean)`

Returns the `string` of relative time to X.

| Range                    | Key  | Sample Output                    |
| ------------------------ | ---- | -------------------------------- |
| 0 to 44 seconds          | s    | a few seconds ago                |
| 45 to 89 seconds         | m    | a minute ago                     |
| 90 seconds to 44 minutes | mm   | 2 minutes ago ... 44 minutes ago |
| 45 to 89 minutes         | h    | an hour ago                      |
| 90 minutes to 21 hours   | hh   | 2 hours ago ... 21 hours ago     |
| 22 to 35 hours           | d    | a day ago                        |
| 36 hours to 25 days      | dd   | 2 days ago ... 25 days ago       |
| 26 to 45 days            | M    | a month ago                      |
| 46 days to 10 months     | MM   | 2 months ago ... 10 months ago   |
| 11 months to 17months    | y    | a year ago                       |
| 18 months+               | yy   | 2 years ago ... 20 years ago     |

### IsLeapYear
 - IsLeapYear adds `.isLeapYear` API to returns a `boolean` indicating whether the `Dayjs`'s year is a leap year or not.

```javascript
import isLeapYear from 'dayjs-ext/plugin/isLeapYear'

dayjs.extend(isLeapYear)

dayjs('2000-01-01').isLeapYear(); // true
```

### BuddhistEra
- BuddhistEra extends `dayjs().format` API to supply Buddhist Era (B.E.) format options.
- Buddhist Era is a year numbering system that primarily used in  mainland Southeast Asian countries of Cambodia, Laos, Myanmar and Thailand as well as in Sri Lanka and Chinese populations of Malaysia and Singapore for religious or official occasions ([Wikipedia](https://en.wikipedia.org/wiki/Buddhist_calendar))
- To calculate BE year manually, just add 543 to year. For example 26 May 1977 AD/CE should display as 26 May 2520 BE (1977 + 543)

```javascript
import buddhistEra from 'dayjs-ext/plugin/buddhistEra'

dayjs.extend(buddhistEra)

dayjs().format('BBBB BB')
```

List of added formats:

| Format | Output           | Description                           |
| ------ | ---------------- | ------------------------------------- |
| `BBBB` | 2561             | Full BE Year (Year + 543)             |
| `BB`   | 61               | 2-digit of BE Year                    |

### WeekOfYear
 - WeekOfYear adds `.week()` API to returns a `number` indicating the `Dayjs`'s week of the year.

```javascript
import weekOfYear from 'dayjs-ext/plugin/weekOfYear'

dayjs.extend(weekOfYear)

dayjs('06/27/2018').week() // 26
```

### IsBetween
 - IsBetween adds `.isBetween()` API to returns a `boolean` indicating if a date is between two other dates.

```javascript
import isBetween from 'dayjs-ext/plugin/isBetween'

dayjs.extend(isBetween)

dayjs('2010-10-20').isBetween('2010-10-19', dayjs('2010-10-25')); // true
```

### CustomParseFormat
 - CustomParseFormat extends `dayjs()` constructor to support custom formats of input strings.

To escape characters, wrap them in square brackets (e.g. `[G]`). Punctuation symbols (-:/.()) do not need to be wrapped.

```customParseFormat
import customParseFormat from 'dayjs-ext/plugin/customParseFormat'

dayjs.extend(customParseFormat)

dayjs('05/02/69 1:02:03 PM -05:00', { format: 'MM/DD/YY H:mm:ss A Z' })
// Returns an instance containing '1969-05-02T18:02:03.000Z'
```

#### List of all available format tokens

| Format | Output           | Description                       |
| ------ | ---------------- | --------------------------------- |
| `YY`   | 18               | Two-digit year                    |
| `YYYY` | 2018             | Four-digit year                   |
| `M`    | 1-12             | Month, beginning at 1             |
| `MM`   | 01-12            | Month, 2-digits                   |
| `D`    | 1-31             | Day of month                      |
| `DD`   | 01-31            | Day of month, 2-digits            |
| `H`    | 0-23             | Hours                             |
| `HH`   | 00-23            | Hours, 2-digits                   |
| `h`    | 1-12             | Hours, 12-hour clock              |
| `hh`   | 01-12            | Hours, 12-hour clock, 2-digits    |
| `m`    | 0-59             | Minutes                           |
| `mm`   | 00-59            | Minutes, 2-digits                 |
| `s`    | 0-59             | Seconds                           |
| `ss`   | 00-59            | Seconds, 2-digits                 |
| `S`    | 0-9              | Hundreds of milliseconds, 1-digit |
| `SS`   | 00-99            | Tens of milliseconds, 2-digits    |
| `SSS`  | 000-999          | Milliseconds, 3-digits            |
| `z`    | EST              | Time zone abbreviation            |
| `Z`    | -5:00            | Offset from UTC                   |
| `ZZ`   | -0500            | Compact offset from UTC, 2-digits |
| `A`    | AM PM            | Post or ante meridiem, upper-case |
| `a`    | am pm            | Post or ante meridiem, lower-case |

If the plugin [LocalizableFormat](#localizableformat) is installed, format tokens "L", "LT" and "LTS" can be used too. They will be translated to the concrete tokens above using the `locale` parameter passed to the `dayjs` constructor, or using the global `dayjs` locale.

### TimeZone
 - TimeZone extends `dayjs()` and `dayjs().format` APIs to support the most important usage scenatrios - parsing from a specific time zone and formatting in other time zone.

```javascript
import timeZone from 'dayjs-ext/plugin/timeZone'

dayjs.extend(timeZone)

const timeZone = 'Europe/Berlin' // Canonical time zone name

// String without a time zone from the date picker
const enteredDate = '2018-09-02 23:41:22'
const storedDate = dayjs(enteredDate, { timeZone }).toISOString()
// Will contain "2018-09-02T21:41:22Z"

// String in UTC or anything that Day.js accepts
const storedDate = '2018-09-02T21:41:22Z'
const userFormat = 'D.M.YYYY H:mm:ss [GMT]Z (z)' // Standard Day.js format
const displayedDate = dayjs(storedDate).format(userFormat, { timeZone })
// Will contain "2.9.2018 23:41:22 GMT+02:00 (CEST)"
```

List of added formats:

| Format | Output | Description             |
| ------ | ------ | ----------------------- |
| `z`    | CEST   | Time zone abbreviation  |
| `Z`    | +02:00 | Offset from UTC         |
| `ZZ`   | +0200  | Compact offset from UTC |

Day.js uses an embedded `Date` object. This object supports only local time zone and UTC. It does not work in other time zones. This plugin leverages this principle and does not replace the internal `Date` object.

* The time zone parameter in the constructor is meant only for converting the parsed input string correctly to UTC. The embedded `Date` object will be initialised with UTC and offer the local time zone representation as usual. The original time zone offset will not be remembered. It is usually not important, because dates should be rendered consistently in user's time zone; not in various time zones, which their string sources referred to.
* The time zone parameter in the `format` method will extract the date parts (year, month, ...) from the embedded `Date` object in UTC and convert them to the specified time zone, before producing the output string.

#### Installation

This plugin has a peer dependency on the `timezone-support` NPM module. If you are going to use it in your project, add it to your dependencies too, along the dependency on `Day.js`:

```sh
npm i --save dayjs timezone-support
```

If you use `Day.js` and this plugin on a web page, include the time-zone module too:

```html
<script arc="https://unpkg.com/dayjs-ext/dayjs.min.js"></script>
<script arc="https://unpkg.com/dayjs-ext/plugin/timeZone.js"></script>
<script arc="https://unpkg.com/timezone-support/dist/index.umd.js"></script>
```

## Customize

You could build your own Day.js plugin to meet different needs.

Feel free to open a pull request to share your plugin.

Template of a Day.js plugin.
```javascript
export default (option, dayjsClass, dayjsFactory) => {
  // extend dayjs()
  // e.g. add dayjs().isSameOrBefore()
  dayjsClass.prototype.isSameOrBefore = function (arguments) {}

  // extend dayjs
  // e.g. add dayjs.utc()
  dayjsFactory.utc = (arguments) => {}

  // overriding existing API
  // e.g. extend dayjs().format()
  const oldFormat = dayjsClass.prototype.format
  dayjsClass.prototype.format = function (arguments) {
    // original format result
    const result = oldFormat(arguments)
    // return modified result
  }
}
```
