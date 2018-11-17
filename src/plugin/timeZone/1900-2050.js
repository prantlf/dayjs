import { populateTimeZones } from 'timezone-support/dist/lookup-convert'
import timeZoneData from 'timezone-support/dist/data-1900-2050'

populateTimeZones(timeZoneData)

export { default } from './custom'
