import dayjs from 'dayjs'
import 'dayjs/locale/ko'

dayjs.locale('ko')

class Days {
  constructor (str) {
    if (str) {
      this.date = dayjs(str)
    } else {
      this.date = dayjs()
    }
  }

  set (unit, num) {
    this.date = this.date.set(unit, num)
    return this
  }

  format (str) {
    return this.date.format(str)
  }

  plus (unit, num) {
    this.date = this.date.add(num, unit)
    return this
  }

  minus (unit, num) {
    this.date = this.date.subtract(num, unit)
    return this
  }

  static diff (dateStr1, dateStr2, unit) {
    const d1 = dayjs(dateStr1)
    const d2 = dayjs(dateStr2)

    return d1.diff(d2, unit)
  }
}
const days = function (str = null) {
  return new Days(str)
}
export default days
