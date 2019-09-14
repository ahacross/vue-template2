import _ from 'lodash'

String.prototype.toNum = function () {
  return Number(this)
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
  this.splice(_.indexOf(this, idx), 1)
  return this
}
