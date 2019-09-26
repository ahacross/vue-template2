/**
 * @desc i18n function fallback
 * @usage
    this.lang('add')
    @return {{methods: {lang(*, *=): *}}}
 */
export const i18nTranslator = function(prefix) {
  return {
    methods: {
      lang(name, params, sumPrefix) {
        if (params && sumPrefix) { // params가 있고 sumPrefix가 true 일 때
          return this.$t(`${prefix}.${name}`, params)
        } else if (params && !sumPrefix) { // params가 있고 sumPrefix가 false 일 때
          return this.$t(name, params)
        } else {
          return this.$t(`${prefix}.${name}`)
        }
      }
    }
  }
}

export default {
  i18nTranslator
}
