/**
 * @desc i18n function fallback
 * @usage
    this.lang('add')
    @return {{methods: {lang(*, *=): *}}}
 */
export const i18nTranslator = function(prefix) {
  return {
    methods: {
      lang(name, noPrefix) {
        return this.$t(noPrefix ? name : `${prefix}.${name}`)
      }
    }
  }
}

export default {
  i18nTranslator
}
