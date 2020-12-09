import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import ko from 'dayjs/locale/ko'
dayjs.extend(customParseFormat)
window.dayjs = dayjs

export function getDate(paramsDate, pattern) {
  if (paramsDate) {
    if (!dayjs.isDayjs(paramsDate) && typeof paramsDate === 'string') {
      paramsDate = pattern ? dayjs(paramsDate, pattern) : dayjs(paramsDate)
    }
  } else {
    paramsDate = dayjs()
  }

  return paramsDate
}

export function getTimestamp(date) {
  return getDate(date).valueOf()
}

export function minus(amount, unit, date) {
  return getDate(date).subtract(amount, unit)
}

export function add(amount, unit, date) {
  return getDate(date).add(amount, unit)
}

export function format(date, pattern = 'YYYY-MM-DD', locale) {
  if (locale) {
    if (locale === 'ko') {
      return getDate(date).locale(ko).format(pattern)
    }
  } else {
    return getDate(date).format(pattern)
  }
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
