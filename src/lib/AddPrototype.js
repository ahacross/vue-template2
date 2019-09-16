import indexOf from 'lodash/indexOf'

String.prototype.toNum = function () {
  return Number(this)
}

String.prototype.firstUpperCase = function () {
  return this.charAt(0).toUpperCase() + this.substr(1)
}

Array.prototype.eq = function (idx) {
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
