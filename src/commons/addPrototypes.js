/* eslint-disable */
String.prototype.splitJoin = function(splitSep, joinSep) {
  return this.split(splitSep).join(joinSep)
}

String.prototype.toNum = function () {
  return Number(this)
}

String.prototype.firstUpperCase = function () {
  return this.charAt(0).toUpperCase() + this.substr(1)
}

String.prototype.commaOff = function () {
  return this.split(',').join('')
}

Number.prototype.commaOn = function () {
  const numStr = this.toString().split('.')
  numStr[0] = numStr.first().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
  return numStr.join('.')
}

Array.prototype.nth = function (idx) {
  return this[idx]
}

Array.prototype.first = function () {
  return this[0]
}

Array.prototype.last = function () {
  return this[this.length - 1]
}

Array.prototype.remove = function (idx) {
  this.splice(indexOf(this, idx), 1)
  return this
}
