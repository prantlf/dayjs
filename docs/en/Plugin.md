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
import dayjs from 'dayjs'
import AdvancedFormat from 'dayjs/plugin/AdvancedFormat' // load on demand

dayjs.extend(AdvancedFormat) // use plugin
```

* Via CDN:
```html
<script src="https://unpkg.com/dayjs"></script>
<!-- Load plugin as window.dayjs_plugin_NAME -->
<script src="https://unpkg.com/dayjs/plugin/advancedFormat"></script>
<script>
  dayjs.extend(dayjs_plugin_advancedFormat);
</script>
```

## List of official plugins

### AdvancedFormat
 - AdvancedFormat extends `dayjs().format` API to supply more format options.

```javascript
import advancedFormat from 'dayjs/plugin/advancedFormat'

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

### RelativeTime
 - RelativeTime adds `.from` `.to` `.fromNow` `.toNow` APIs to formats date to relative time strings (e.g. 3 hours ago).

```javascript
import relativeTime from 'dayjs/plugin/relativeTime'

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
import isLeapYear from 'dayjs/plugin/isLeapYear'

dayjs.extend(isLeapYear)

dayjs('2000-01-01').isLeapYear(); // true
```

### BuddhistEra
- BuddhistEra extends `dayjs().format` API to supply Buddhist Era (B.E.) format options.
- Buddhist Era is a year numbering system that primarily used in  mainland Southeast Asian countries of Cambodia, Laos, Myanmar and Thailand as well as in Sri Lanka and Chinese populations of Malaysia and Singapore for religious or official occasions ([Wikipedia](https://en.wikipedia.org/wiki/Buddhist_calendar))
- To calculate BE year manually, just add 543 to year. For example 26 May 1977 AD/CE should display as 26 May 2520 BE (1977 + 543)

```javascript
import buddhistEra from 'dayjs/plugin/buddhistEra'

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
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekOfYear)

dayjs('06/27/2018').week() // 26
```

### IsBetween
 - IsBetween adds `.isBetween()` API to returns a `boolean` indicating if a date is between two other dates.

```javascript
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

dayjs('2010-10-20').isBetween('2010-10-19', dayjs('2010-10-25')); // true
```

### UTC
 - The UTC plugin extends `Day.js` instances to work in UTC. This can be used also to work with dates safely, which are not supposed to include the time part.

```javascript
import utcMode from 'dayjs/plugin/utcMode'

dayjs.extend(utcMode)
```

`Day.js` instances can be initialized using a string with any time zone offset. However, the native JavaScript `Date` object used internally works only in the local time zone with the support of accessing the object value in UTC too. If no time zone is specified, the local time zone is assumed. `Day.js` follows the same principle.

`Day.js` instances can be initialized in the *UTC mode*, which makes getters, setters and formatting methods use the UTC properties of the `Date` object. It can be useful to:

* Initialize and use `Day.js` instances always in UTC, without specifying the time zone explicitly.
* Initialize and use `Day.js` instances in a *date-only mode*.

### Date-only Mode

Sometimes only the day is important; not the time. If a `Day.js` instance or a `Date` object itself is initialized with the date part only, the constructor assumes a full UTC date and automatically adds the time part:

```js
const date = dayjs('2018-09-07')
new Date('2018-09-07')
// Both assume an input "2018-09-07T00:00:00Z".
// Both initialize the date to "2018-09-07 02:00:00 +02:00" in Central Europe.
const day = date.date() // Returns 7, OK.
const day = date.hour() // Returns 2, but well, we do not use the time part.
```

Because the input is assumed in UTC, when converting to the local time zone, which is used by default in both `Day.js` instances and `Date` objects, a time zone conversion will be performed. It can change the value of the day, if the time zone offset from UTC is negative, which may be a problem:

```js
const date = dayjs('2018-09-07')
new Date('2018-09-07')
// Both assume an input "2018-09-07T00:00:00Z".
// Both initialize the date to "2018-09-06 18:00:00 -06:00" in North-East America.
const day = date.date() // Returns 6, a bad surprise.
const day = date.hour() // Returns 18, but well, we do not use the time part.
```

Switching the `Day.js` instance to the UTC mode will not change the initialization or value of the internal `Date` object, so that any date computations and comparisons with other `Day.js` instances will be correct. However, getters, setters and formatting methods will use date parts in UTC, making at appear, that no conversion to the local time zone took place.

```js
const date = dayjs('2018-09-07', { utc: true })
const date = dayjs('2018-09-07').utc()
// Both assume an input "2018-09-07T00:00:00Z".
// Both initialize the date to "2018-09-06 18:00:00 -06:00" in North-East America.
// Both remember to use UTC date parts on the interface of Day.js.
const day = date.date() // Returns 7, OK.
const day = date.hour() // Returns 0, OK; well, we do not use the time part.
```

### Is UTC `.isUTC()`

Returns a `boolean` indicating whether the `Dayjs` instance works in the UTC mode or not.

```js
dayjs().isUTC(); // Returns false
dayjs().utc().isUTC(); // Returns true
```

### To UTC `.utc() | dayjs(original: Dayjs, { utc: true })`

Returns a cloned `Dayjs` instance in the UTC mode. The UTC mode will be retained, when cloning the `Day.js` instance further, unless `utc: false` is specified.

```js
dayjs().utc();
dayjs('2019-01-25', { utc: true });
dayjs().utc().clone(); // continues in the UTC mode
dayjs(dayjs('2019-01-25', { utc: true })); // continues in the UTC mode
```

### To Local `.local() | dayjs(original: Dayjs, { utc: false })`

Returns a cloned `Dayjs` instance in the local time zone mode. The local time zone mode will be retained, when cloning the `Day.js` instance further, unless `utc: true` is specified. It is also the default mode of constructing a new `Day.js` instance.

```js
dayjs('2019-01-25', { utc: true }).local();
dayjs('2019-01-25 15:43', { utc: false }); // default, not necessary
dayjs('2019-01-25', { utc: true }).local().clone(); // continues in the local mode
dayjs(dayjs().utc().local()); // continues in the local mode
```

### UTC Offset `.utcOffset()`

Returns an offset of the `Dayjs`'s instance to UTC in minutes. It is a negative offset like `Date.prototype.getTimezoneOffset` returns it. If it is *added* to a zoned time, a time in UTC will be obtained.

```js
const date = dayjs('2019-01-25 15:43');
const offset = date.utcOffset() // Returns -60 in Central Europe
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