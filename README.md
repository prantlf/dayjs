<h1 align="center">Day.js Extended</h1>

<p align="center">Fast <b>2kB</b> alternative to Moment.js with the same modern API</p>
<p align="center">(This is an <a href="#extensions-to-the-original-project">extended</a> fork of the <a href="https://github.com/iamkun/dayjs">original project</a>.)</p>
<br>
<p align="center">
    <a href="https://unpkg.com/dayjs-ext/dayjs.min.js"><img
       src="http://img.badgesize.io/https://unpkg.com/dayjs-ext/dayjs.min.js?compression=gzip&style=flat-square"
       alt="Gzip Size"></a>
    <a href="https://www.npmjs.com/package/dayjs-ext"><img
       src="https://img.shields.io/npm/v/dayjs-ext.svg?style=flat-square&colorB=51C838"
       alt="NPM Version"></a>
    <a href="https://travis-ci.org/prantlf/dayjs"><img
       src="https://img.shields.io/travis/prantlf/dayjs/master.svg?style=flat-square" alt="Build Status"></a>
    <a href="https://codecov.io/gh/prantlf/dayjs"><img
       src="https://img.shields.io/codecov/c/github/prantlf/dayjs/master.svg?style=flat-square" alt="Codecov"></a>
    <a href="https://david-dm.org/prantlf/dayjs"><img
       src="https://david-dm.org/prantlf/dayjs.svg" alt="Dependency Status"></a>
    <a href="https://david-dm.org/prantlf/dayjs#info=devDependencies"><img
       src="https://david-dm.org/prantlf/dayjs/dev-status.svg" alt="Dependency Status"></a>
    <a href="https://github.com/prantlf/dayjs/blob/master/LICENSE"><img
       src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="License"></a>
</p>

> Day.js is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers with a largely Moment.js-compatible API. If you use Moment.js, you already know how to use Day.js.

```js
dayjs().startOf('month').add(1, 'day').set('year', 2018).format('YYYY-MM-DD HH:mm:ss');
```

* 🕒 Familiar Moment.js API & patterns
* 💪 Immutable
* 🔥 Chainable
* 🌐 I18n support
* 📦 2kb mini library
* 👫 All browsers supported

## Extensions to the original project

* New plugin "[customParseFormat]" to parse input strings using custom formats.
* New plugin "[localizableFormat]" to format dates according to the chosen locale.
* New plugin "[timeZone]" to parse from and format to a date string using a time zone specified by its canonical name.
* Corrected plugin "[relativeTime]" honouring grammar rules of the supported languages.
* "[UTC mode]" for working in UTC, or for working with date-only values without the time part.
* Additional locales ([cs], [ru], [sk], [uk]).
* Check for `dayjs` instance by the `instanceof` operator.

## Synopsis

`Day.js` is usually imported via a "proxy module", which loads required plugins and registers required language packs. For example, via the following `dayjs-local.js`:

```js
// Load dayjs, plugins and language packs.
import dayjs from 'dayjs-ext'
import timeZonePlugin from 'dayjs-ext/plugin/timeZone'
import customParseFormat from 'dayjs-ext/plugin/customParseFormat'
import localizableFormat from 'dayjs-ext/plugin/localizableFormat'
import relativeTime from 'dayjs-ext/plugin/relativeTime'
import 'dayjs-ext/locale/cs'
import 'dayjs-ext/locale/sk'

// Register plugins and language packs; Czech will be the default language.
dayjs.extend(timeZonePlugin)
     .extend(customParseFormat)
     .extend(localizableFormat)
     .extend(relativeTime)
     .locale('cs')

export default dayjs
```

Typical usage scenarios:


```js
import dayjs from './dayjs-local'

// Load a date+time from a storage and show it to the user.
const dateTime = dayjs('2018-10-28T18:45:00.000Z')
console.log(dateTime.format({ format: 'L LT', timeZone: 'Europe/Prague' }))
// Prints "28.10.2018 19:45".
console.log(dateTime.fromNow())
// Prints "před 5 hodinami" (5 hours ago).

// Read a date+time from the user and format it for the storage.
const dateTime = dayjs('28.10.2018 19:45', { format: 'L LT', timeZone: 'Europe/Prague' })
console.log(dateTime.toISOString())
// Prints "2018-10-28T18:45:00.000Z".

// Set only the date; zero the time and prevent local time zone conversion.
const dateOnly = dayjs('2018-10-28', { utc: true })
console.log(dateOnly.format({ format: 'YYYY-MM-DD' }))
// Prints "2018-10-28" anytime and anywhere.
```

## Getting Started

### Installation

```console
npm install dayjs-ext --save
```

📚[Installation Guide](./docs/en/Installation.md)

### API

It's easy to use Day.js APIs to parse, validate, manipulate, and display dates and times.

```javascript
dayjs('2018-08-08') // parse

dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A') // display

dayjs().set('month', 3).month() // get & set

dayjs().add(1, 'year') // manipulate

dayjs().isBefore(dayjs()) // query
```

📚[API Reference](./docs/en/API-reference.md)

### I18n

Day.js has great support for internationalization.

But none of them will be included in your build unless you use it.

```javascript
import 'dayjs-ext/locale/es' // load on demand

dayjs.locale('es') // use Spanish locale globally

dayjs('2018-05-05').locale('zh-cn').format() // use Chinese Simplified locale in a specific instance
```
📚[Internationalization](./docs/en/I18n.md)

### Plugin

A plugin is an independent module that can be added to Day.js to extend functionality or add new features.

```javascript
import timeZone from 'dayjs-ext/plugin/timeZone' // load on demand

dayjs.extend(timeZone) // use plugin

dayjs().format('D.M.YYYY H:mm',
  { timeZone: 'Europe/Berlin' }) // convert to CET before formatting
```

📚[Plugin List](./docs/en/Plugin.md)

## Sponsors

See the [sponsor list at the original project]. Thank you for your support!

## Contributors

See the [contributor list at the original project]. Thank you for your help!

## License

Day.js is Extended licensed under a [MIT  License](./LICENSE).

[original project]: https://github.com/iamkun/dayjs
[sponsor list at the original project]: https://github.com/iamkun/dayjs#sponsors
[contributor list at the original project]: https://github.com/iamkun/dayjs#sponsors
[customParseFormat]: ./docs/en/Plugin.md#customParseFormat
[localizableFormat]: ./docs/en/Plugin.md#localizableformat
[timeZone]: ./docs/en/Plugin.md#timezone
[relativeTime]: ./docs/en/Plugin.md#relativetime
[UTC mode]: ./docs/en/API-reference.md#utc-mode
[cs]: ./src/locale/cs.js
[ru]: ./src/locale/ru.js
[sk]: ./src/locale/sk.js
[uk]: ./src/locale/uk.js
