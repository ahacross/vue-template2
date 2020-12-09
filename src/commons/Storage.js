export default class {
  setStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  getStorage(key) {
    return JSON.parse(sessionStorage.getItem(key))
  }

  removeStorage(key) {
    sessionStorage.removeItem(key)
  }

  clearStorage() {
    return sessionStorage.clear()
  }
}
