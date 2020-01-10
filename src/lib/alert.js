import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.min.css'
import 'alertifyjs/build/css/themes/default.min.css'
import Vue from 'vue'

function lang(msg) {
  return Vue.i18n.translate(msg)
}

const removeHeader = function(target) {
  target.elements.header.remove()
}

// const setZindex = function (target) {
//   const zIndex = '6000'
//   const elements = target.elements
//   elements.modal.style.zIndex = zIndex
//   elements.dimmer.style.zIndex = zIndex
// }

const setNoti = function(target) {
  removeHeader(target)
  // setZindex(target)
}

const notify = {
  options: {
    'autoReset': true,
    'resizable': false,
    'movable': true,
    'closable': false,
    'pinnable': false,
    'transition': 'zoom'
  }
}

const setAlert = function() {
  alertify.alert().setting(Object.assign({ 'label': lang('buttons.ok') }, notify.options))
  setNoti(alertify.alert())
}

const setConfirm = function() {
  alertify.confirm().setting(Object.assign({ 'labels': { ok: lang('buttons.ok'), cancel: lang('buttons.cancel') } }, notify.options))
  setNoti(alertify.confirm())
}

const init = function() {
  // notify.options
  setAlert()
  setConfirm()
}
setTimeout(init, 500)

window.$alert = function(msg, callback, params, noModal) {
  if (noModal) {
    alertify.alert('', msg, callback).set({ modal: false, pinnable: false })
  } else if (params) {
    alertify.alert('', msg, callback).set(params)
  } else {
    alertify.alert('', msg, callback)
  }
}

window.$confirm = function(msg, callback, params) {
  if (params) {
    alertify.confirm(msg, callback).set(params)
  } else {
    alertify.confirm(msg, callback)
  }
}
