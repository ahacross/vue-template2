import store from '../store'

export function getters(key) {
  return store.getters[key]
}

export function dispatch(key, value) {
  store.dispatch(key, value)
}
