## [2.0.1](https://github.com/prantlf/dayjs.git/compare/v2.0.0...v2.0.1) (2018-10-28)


### Bug Fixes

* Remove support of the intermediate localization format ([1e1c5f6](https://github.com/prantlf/dayjs.git/commit/1e1c5f6))

# [2.0.0](https://github.com/prantlf/dayjs.git/compare/v1.12.3...v2.0.0) (2018-10-28)


### Bug Fixes

* Remove the locale "ua" and leave just "uk", which is correct according to ISO 639 ([7917304](https://github.com/prantlf/dayjs.git/commit/7917304))


### BREAKING CHANGES

* The locale "ua" is not suported any more. Use the identifier "uk" for the Ukrainian language.

## [1.12.3](https://github.com/prantlf/dayjs.git/compare/v1.12.2...v1.12.3) (2018-10-28)


### Bug Fixes

* [#386](https://github.com/prantlf/dayjs.git/issues/386) - Added logic to return just 0 ([1a09a57](https://github.com/prantlf/dayjs.git/commit/1a09a57))
* Replace the internal logic for looking up the right plural form by using the fast-plural-rules NPM module ([6253bcd](https://github.com/prantlf/dayjs.git/commit/6253bcd))

## [1.12.2](https://github.com/prantlf/dayjs/compare/v1.12.1...v1.12.2) (2018-10-14)


### Bug Fixes

* Change the locale structure to support a special singular form ([1bb9c6b](https://github.com/prantlf/dayjs/commit/1bb9c6b))
* Correct upgrading from the improved locale format to the ultimate one ([f39fb48](https://github.com/prantlf/dayjs/commit/f39fb48))
* Update sk and ua locales to support the change in the locale format ([386e641](https://github.com/prantlf/dayjs/commit/386e641))

## [1.12.1](https://github.com/prantlf/dayjs/compare/v1.12.0...v1.12.1) (2018-10-14)


### Bug Fixes

* Correct upgrading from the improved locale format to the ultimate one ([e1a290e](https://github.com/prantlf/dayjs/commit/e1a290e))

# [1.12.0](https://github.com/prantlf/dayjs/compare/v1.11.2...v1.12.0) (2018-10-14)


### Features

* Recognize localizable format L, LT and LTS in custom parse formats ([881e66c](https://github.com/prantlf/dayjs/commit/881e66c))

## [1.11.2](https://github.com/prantlf/dayjs/compare/v1.11.1...v1.11.2) (2018-10-13)


### Bug Fixes

* Change the locale structure to support different plural rules and forms ([4ae6724](https://github.com/prantlf/dayjs/commit/4ae6724))
* Convert sk and ua locales to the new format ([a0e42f9](https://github.com/prantlf/dayjs/commit/a0e42f9))
* Convert weekdays in ru and ua locales to lower-case ([e9be3a0](https://github.com/prantlf/dayjs/commit/e9be3a0))
* Extend checks for invalid date string in CustomParseFormat ([be71f6e](https://github.com/prantlf/dayjs/commit/be71f6e))

## [1.11.1](https://github.com/prantlf/dayjs/compare/v1.11.0...v1.11.1) (2018-09-29)


### Bug Fixes

* Do not store the Date object instance passed to the dayjs function ([08d518c](https://github.com/prantlf/dayjs/commit/08d518c))

# [1.11.0](https://github.com/prantlf/dayjs/compare/v1.10.4...v1.11.0) (2018-09-27)


### Bug Fixes

* **add dayjs.unix:** add dayjs.unix to parse timestamp in seconds && locale update ([5711c5e](https://github.com/prantlf/dayjs/commit/5711c5e))
* **DST:** fix daylight saving time DST bug && add test ([#354](https://github.com/prantlf/dayjs/issues/354)) ([6fca6d5](https://github.com/prantlf/dayjs/commit/6fca6d5))
* Retain UTC mode when constructing a new instance from another instance in UTC mode ([beb80fc](https://github.com/prantlf/dayjs/commit/beb80fc))


### Features

* Add static method dayjs.utc to help migration from Moment.js ([e640b57](https://github.com/prantlf/dayjs/commit/e640b57))

## [1.10.4](https://github.com/prantlf/dayjs/compare/v1.10.3...v1.10.4) (2018-09-26)


### Bug Fixes

* Upgrade timezone-support ([ccb7dad](https://github.com/prantlf/dayjs/commit/ccb7dad))

## [1.10.3](https://github.com/prantlf/dayjs/compare/v1.10.2...v1.10.3) (2018-09-18)


### Bug Fixes

* Move timezone-support to dependencies; the plugin does not bundle it ([76144f2](https://github.com/prantlf/dayjs/commit/76144f2))

## [1.10.2](https://github.com/prantlf/dayjs/compare/v1.10.1...v1.10.2) (2018-09-18)


### Bug Fixes

* Add customParseFormat to npm package ([15193ee](https://github.com/prantlf/dayjs/commit/15193ee))

## [1.10.1](https://github.com/prantlf/dayjs/compare/v1.10.0...v1.10.1) (2018-09-15)


### Bug Fixes

* **typings:** default export issue[#277](https://github.com/prantlf/dayjs/issues/277) ([149d477](https://github.com/prantlf/dayjs/commit/149d477))
* Do not clone the Date instance needlessly in toISOString ([088cdc5](https://github.com/prantlf/dayjs/commit/088cdc5))

# [1.10.0](https://github.com/prantlf/dayjs/compare/v1.9.0...v1.10.0) (2018-09-14)


### Features

* CustomParseFormat - a plugin for the constructor to parse strings in custom formats ([2158218](https://github.com/prantlf/dayjs/commit/2158218))

# [1.9.0](https://github.com/prantlf/dayjs/compare/v1.8.0...v1.9.0) (2018-09-13)


### Features

* Add Ukrainian (UA) locale ([acd628c](https://github.com/prantlf/dayjs/commit/acd628c))

# [1.8.0](https://github.com/prantlf/dayjs/compare/v1.7.5...v1.8.0) (2018-09-13)

### Features

* Introduce dayjs-ext - fork of days with extensions ([4ab9f9a](https://github.com/prantlf/dayjs/commit/4ab9f9a))

## [1.7.7](https://github.com/iamkun/dayjs/compare/v1.7.6...v1.7.7) (2018-09-26)


### Bug Fixes

* **DST:** fix daylight saving time DST bug && add test ([#354](https://github.com/iamkun/dayjs/issues/354)) ([6fca6d5](https://github.com/iamkun/dayjs/commit/6fca6d5))

## [1.7.6](https://github.com/iamkun/dayjs/compare/v1.7.5...v1.7.6) (2018-09-25)


### Bug Fixes

* **add dayjs.unix:** add dayjs.unix to parse timestamp in seconds && locale update ([5711c5e](https://github.com/iamkun/dayjs/commit/5711c5e))

## [1.7.5](https://github.com/iamkun/dayjs/compare/v1.7.4...v1.7.5) (2018-08-10)


### Bug Fixes

* add isBetween API & update ([b5fc3d1](https://github.com/iamkun/dayjs/commit/b5fc3d1))

## [1.7.4](https://github.com/iamkun/dayjs/compare/v1.7.3...v1.7.4) (2018-07-11)


### Bug Fixes

* update set week logic ([60b6325](https://github.com/iamkun/dayjs/commit/60b6325)), closes [#276](https://github.com/iamkun/dayjs/issues/276)

## [1.7.3](https://github.com/iamkun/dayjs/compare/v1.7.2...v1.7.3) (2018-07-10)


### Bug Fixes

* **locale-nl:** set correct weekdays and months ([6d089d7](https://github.com/iamkun/dayjs/commit/6d089d7))

## [1.7.2](https://github.com/iamkun/dayjs/compare/v1.7.1...v1.7.2) (2018-07-04)


### Bug Fixes

* DEPRECATED isLeapYear, use IsLeapYear plugin instead ([e2e5116](https://github.com/iamkun/dayjs/commit/e2e5116))

## [1.7.1](https://github.com/iamkun/dayjs/compare/v1.7.0...v1.7.1) (2018-07-03)


### Bug Fixes

* fix week() error near the end of the year ([fa03689](https://github.com/iamkun/dayjs/commit/fa03689))

# [1.7.0](https://github.com/iamkun/dayjs/compare/v1.6.10...v1.7.0) (2018-07-02)


### Features

* Added method `.week()` to retrieve week of the year ([e1c1b1c](https://github.com/iamkun/dayjs/commit/e1c1b1c))
* Updated Japanese locae

## [1.6.10](https://github.com/iamkun/dayjs/compare/v1.6.9...v1.6.10) (2018-06-25)


### Bug Fixes

* Add relative locales to russian language ([c7e9898](https://github.com/iamkun/dayjs/commit/c7e9898)), closes [#256](https://github.com/iamkun/dayjs/issues/256)

## [1.6.9](https://github.com/iamkun/dayjs/compare/v1.6.8...v1.6.9) (2018-06-14)


### Bug Fixes

* add isDayjs => boolean API ([6227c8b](https://github.com/iamkun/dayjs/commit/6227c8b))

## [1.6.8](https://github.com/iamkun/dayjs/compare/v1.6.7...v1.6.8) (2018-06-14)


### Bug Fixes

* fix  Advanced format bug in zh-cn ([0c07874](https://github.com/iamkun/dayjs/commit/0c07874)), closes [#242](https://github.com/iamkun/dayjs/issues/242)

## [1.6.7](https://github.com/iamkun/dayjs/compare/v1.6.6...v1.6.7) (2018-06-11)


### Bug Fixes

* fix id locale ([1ebbeb8](https://github.com/iamkun/dayjs/commit/1ebbeb8)), closes [#234](https://github.com/iamkun/dayjs/issues/234)

<a name="1.6.6"></a>
## [1.6.6](https://github.com/iamkun/dayjs/compare/v1.6.5...v1.6.6) (2018-06-06)


### Bug Fixes

*  format API update and locale file update ([5ca48f0](https://github.com/iamkun/dayjs/commit/5ca48f0)), closes [#228](https://github.com/iamkun/dayjs/issues/228)

<a name="1.6.5"></a>
## [1.6.5](https://github.com/iamkun/dayjs/compare/v1.6.4...v1.6.5) (2018-05-31)


### Bug Fixes

* bugfix, utils update and  locale file update ([ebcb6d5](https://github.com/iamkun/dayjs/commit/ebcb6d5)), closes [#214](https://github.com/iamkun/dayjs/issues/214)

<a name="1.6.4"></a>
## [1.6.4](https://github.com/iamkun/dayjs/compare/v1.6.3...v1.6.4) (2018-05-25)


### Bug Fixes

* add RelativeTime plugin and locale file update ([c1fbbca](https://github.com/iamkun/dayjs/commit/c1fbbca)), closes [#198](https://github.com/iamkun/dayjs/issues/198)

<a name="1.6.3"></a>
## [1.6.3](https://github.com/iamkun/dayjs/compare/v1.6.2...v1.6.3) (2018-05-21)


### Bug Fixes

* Changing locales locally is immutable from this release ([2cce729](https://github.com/iamkun/dayjs/commit/2cce729)), closes [#182](https://github.com/iamkun/dayjs/issues/182)
* instance locale change should be immutable ([84597c9](https://github.com/iamkun/dayjs/commit/84597c9))
* Add more locales
* english ordinal fix

<a name="1.6.2"></a>
## [1.6.2](https://github.com/iamkun/dayjs/compare/v1.6.1...v1.6.2) (2018-05-18)


### Bug Fixes

* change-log update && test new npm release ([aa49cba](https://github.com/iamkun/dayjs/commit/aa49cba)), closes [#163](https://github.com/iamkun/dayjs/issues/163)

<a name="1.6.1"></a>
## [1.6.1](https://github.com/iamkun/dayjs/compare/v1.6.0...v1.6.1) (2018-05-18)


### Bug Fixes

* Add German, Brazilian Portuguese locales
* add() & parse() bug fix & add locale de, pt-br ([bf1331e](https://github.com/iamkun/dayjs/commit/bf1331e))

<a name="1.6.0"></a>
# [1.6.0](https://github.com/iamkun/dayjs/compare/v1.5.24...v1.6.0) (2018-05-15)


### Features

* Locale && Plugin ([2342c55](https://github.com/iamkun/dayjs/commit/2342c55)), closes [#141](https://github.com/iamkun/dayjs/issues/141)
