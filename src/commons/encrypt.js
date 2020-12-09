import JSEncrypt from 'jsencrypt'
import { getStorage } from '@/commons/Storage'

class Encrypt {
  constructor () {
    this._instance = new JSEncrypt()
  }

  enc(value) {
    this._instance.setPublicKey(getStorage('publicKey'))
    return this._instance.encrypt(value)
  }

  dec(value) {
    this._instance.setPublicKey(getStorage('publicKey'))
    return this._instance.decrypt(value)
  }
}

export default new Encrypt()
