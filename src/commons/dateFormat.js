const num = /\d+/g
const notNum = /[^\d]+/g
const date = '(\\d{4})([^\\d]?)(0[1-9]|1[0-2])([^\\d]?)(0[1-9]|[1-2]\\d|3[0-1])'
const hm = '([01]\\d|2[0-4])([^\\d]?)(0[1-9]|[1-5]\\d)'
const time = `${hm}([^\\d]?)(0[1-9]|[1-5]\\d)`

const patternMap = new Map()
patternMap.set('8', `${date}`)
patternMap.set('12', `${date}([^\\d]?)${hm}`)
patternMap.set('14', `${date}([^\\d]?)${time}`)

const formatArr = ['YYYY', 'MM', 'DD', 'HH', 'mm', 'ss']

// 20201123 입력 -> YYYYMMDD 출력
// 2020-11-23 -> YYYY-MM-DD
export function getDatePattern(str) {
  str = String(str)
  const pattern = patternMap.get(`${str.replace(notNum, '').length}`)
  let sumIndex = 0
  return [...str.matchAll(pattern)].flat().filter(c => c !== str).reduce((sum, v) => {
    sum += num.test(v) ? formatArr[sumIndex++] : (v === ' ' ? 'T' : v)
    return sum
  }, '')
}
