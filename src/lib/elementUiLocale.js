import locale from 'element-ui/lib/locale'

export const setElementUiLocale = function(lang) {
  let elLocale
  if (['ko', 'en'].includes(lang)) {
    elLocale = import(`element-ui/lib/locale/lang/${lang}`)
  }

  elLocale.then(el => {
    locale.use(el.default)
  })
}
