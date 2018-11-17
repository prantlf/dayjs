import { populateTimeZones } from 'timezone-support/dist/lookup-convert'
import timeZoneData from 'timezone-support/dist/data-1970-2038'

populateTimeZones(timeZoneData)

export { default } from './custom'
