// alert confirm
import Swal from 'sweetalert2'

function mixin(options) {
  return Swal.mixin(options)
}

const swalAlert = {
  focusConfirm: true,
  confirmButtonText: '확인',
  confirmButtonColor: '000000'
}

const $alert = async (html, confirmButtonText = '확인') => {
  const alert = mixin(Object.assign({}, swalAlert, { confirmButtonText }))
  await alert.fire({ html })
}

const swalConfirm = {
  focusConfirm: true,
  confirmButtonText: 'OK',
  confirmButtonColor: '000000',
  showCancelButton: true,
  cancelButtonText: 'Cancel',
  cancelButtonColor: 'FF0000',
  reverseButtons: true
}

const $confirm = async (html, confirmButtonText = '확인', cancelButtonText = '취소') => {
  const confirm = mixin(Object.assign({}, swalConfirm, { confirmButtonText, cancelButtonText }))
  const result = await confirm.fire({ html })
  return result.isConfirmed
}

export default {
  install (Vue) {
    Vue.prototype.$alert = $alert
    Vue.prototype.$confirm = $confirm
  }
}
