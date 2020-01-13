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
    'maximizable': false,
    'transition': 'zoom'
  }
}

const setAlert = function() {
  setNoti(alertify.alert().setting(Object.assign({ 'label': lang('buttons.ok') }, notify.options)))
}

const setConfirm = function() {
  setNoti(alertify.confirm().setting(Object.assign({ 'labels': { ok: lang('buttons.ok'), cancel: lang('buttons.cancel') } }, notify.options)))
}

const setNewAlert = function() {
  if (!alertify.CustomAlert) { // define a new dialog
    alertify.dialog('CustomAlert', function factory() {
      return {
        main: function(message, ...funcs) {
          this.message = message
          this.funcs = funcs
        },
        setup: function() {
          return {
            buttons: [
              { text: 'alert' },
              { text: 'confirm' },
              { text: '취소', last: true }
            ],
            focus: { element: 0 },
            options: Object.assign({}, notify.options)
          }
        },
        prepare: function() {
          this.setContent(this.message)
        },
        callback: function (closeEvent) {
          if (closeEvent.button.last) {
            closeEvent.cancel = false
          } else {
            this.funcs[closeEvent.index]()
          }
        }
      }
    })

    setNoti(alertify.CustomAlert())
  }
}

const init = function() {
  setAlert()
  setConfirm()
  setNewAlert()
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

window.$CustomAlert = function(msg, func1, func2) {
  alertify.CustomAlert(msg, func1, func2)
}
