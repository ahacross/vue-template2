/**
 * @desc i18n function fallback
 * @usage
    this.lang('add')
    @return {{methods: {lang(*, *=): *}}}
 */

const exceptions = ['buttons', 'msg', 'picker', 'etc', 'validator', 'menus']

export const i18nTranslator = function(prefix) {
  return {
    methods: {
      $l(name, params) {
        const type = typeof params
        let key

        if (params === true || (type === 'object' && params.pass) || exceptions.includes(name.split('.')[0])) {
          key = name
        } else {
          key = `${prefix}.${name}`
        }

        if (type === 'object') { // params가 object 일 때
          return this.$t(key, params)
        } else {
          return this.$t(key)
        }
      }
    }
  }
}

export default {
  i18nTranslator
}
