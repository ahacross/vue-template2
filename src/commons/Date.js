import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import ko from 'dayjs/locale/ko'
dayjs.extend(customParseFormat)
window.dayjs = dayjs

export function makeDate(date, pattern) {
  let dayjsObj
  if (dayjs.isDayjs(date)) {
    dayjsObj = date
  } else if (typeof date === 'string') {
    dayjsObj = pattern ? dayjs(date, pattern) : dayjs(date)
  } else if (date instanceof Date) {
    dayjsObj = dayjs(date.toJSON())
  } else {
    dayjsObj = dayjs()
  }

  return dayjsObj
}

export function getTimestamp(date) {
  return makeDate(date).valueOf()
}

export function minus(amount, unit, date) {
  return makeDate(date).subtract(amount, unit)
}

export function plus(amount, unit, date) {
  return makeDate(date).add(amount, unit)
}

export function format(date, pattern = 'YYYY-MM-DD', locale) {
  let obj = makeDate(date)
  if (locale && locale === 'ko') {
    obj = obj.locale(ko)
  }
  return obj.format(pattern)
}

/**
 *
 * @param date string '2020-09-02 15:30'
 * @param start number 9
 * @param tick number 30 / 60
 * @returns {number} tick number
 */
export function timeToTick(date, start = 8, tick = 30) {
  start = start.toString().padStart(2, '0')
  return Math.floor((getTimestamp(date) - getTimestamp(`${format(date)} ${start}:00`)) / 1000 / 60 / tick)
}

// 1: 안 지났음
// 0: 같음
// -1: 지났음
export function diff(date1, date2 = null) {
  let value
  if (date2) {
    console.log(getTimestamp(date1), getTimestamp(date2))
    value = getTimestamp(date1) - getTimestamp(date2)
  } else {
    console.log(getTimestamp(date1), getTimestamp())
    value = getTimestamp(date1) - getTimestamp()
  }

  return value === 0 ? 0 : value > 0 ? 1 : -1
}

// () 양 끝에 겹치는 경우 제외
// [] 양 끝에 겹치는 경우 포함
export function isBetween(date, start, end, isInclude = '()') {
  return makeDate(date).isBetween(start, end, null, isInclude)
}

export function isAfter(date, date2) {
  return makeDate(date).isAfter(makeDate(date2))
}

export function isBefore(date, date2) {
  return makeDate(date).isBefore(makeDate(date2))
}
