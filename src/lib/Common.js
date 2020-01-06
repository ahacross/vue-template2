export function generateUID() {
  return ((Math.random() * Math.pow(36, 6) << 0).toString(36)).slice(-6)
}

export function numToPX(num) {
  return `${num}px`
}
