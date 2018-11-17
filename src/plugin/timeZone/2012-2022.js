import { populateTimeZones } from 'timezone-support/dist/lookup-convert'
import timeZoneData from 'timezone-support/dist/data-2012-2022'

populateTimeZones(timeZoneData)

export { default } from './custom'
