import { AES, enc } from 'crypto-js'
import { getStorage } from '@/commons/Storage'

function getKey() {
  return getStorage('publicKey')
}

export function encryptAES(value) {
  return AES.encrypt(JSON.stringify(value), getKey()).toString()
}

export function decryptAES(value) {
  return JSON.parse(AES.decrypt(value, getKey()).toString(enc.Utf8))
}
