export const setStorage = function(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getStorage = function(key) {
  return JSON.parse(localStorage.getItem(key))
}
