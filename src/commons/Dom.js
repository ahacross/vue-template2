export default class {
  selector(name) {
    return document.querySelector(name)
  }

  selectorAll(name) {
    return document.querySelectorAll(name)
  }

  isStr(param) {
    return typeof param === 'string'
  }

  getElement(element) {
    if (this.isStr(element)) {
      element = this.selector(element)
    }

    return element
  }

  // 전체교체
  setClass(element, classNames) {
    this.getElement(element).classList = classNames
  }

  // 하나 추가
  addClass(element, className) {
    this.getElement(element).classList.add(className)
  }

  // 유무 확인
  hasClass(element, className) {
    return this.getElement(element).classList.contains(className)
  }

  // 삭제
  removeClass(element, className) {
    this.getElement(element).classList.remove(className)
  }

  // 토글
  toggleClass(element, className) {
    if (this.hasClass(element, className)) {
      this.removeClass(element, className)
    } else {
      this.addClass(element, className)
    }
  }

  setStyle(element, styles) {
    Object.assign(this.getElement(element).style, styles)
  }

  // value가 false 일땐 removeAttribute 함.
  attr(el, key, value) {
    if (value === false) {
      el.removeAttribute(key)
    } else if (value) {
      el.setAttribute(key, value)
    } else {
      return el.getAttribute(key)
    }
  }
}
