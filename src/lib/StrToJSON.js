export const prettyJsonStr = function(str, sepr = '=') {
  let result = ''
  if (str === '{}') {
    result = str
  } else {
    result = str.split(',').map(temp => {
      return temp.split(sepr).map(temp2 => {
        temp2 = temp2.trim()
        let prefix = ''
        let suffix = ''

        // eslint-disable-next-line no-useless-escape
        const pre = temp2.match(/[\[{]+/)
        if (pre) {
          prefix = pre[0]
          temp2 = temp2.substring(pre.index + prefix.length)
        }

        const suf = temp2.match(/[}\]]+/)
        if (suf) {
          suffix = suf[0]
          temp2 = temp2.substring(0, suf.index)
        }

        return prefix + changeToType(temp2) + suffix
      }).join(':')
    }).join(',')
  }
  return JSON.stringify(JSON.parse(result), null, 4)
}

const changeToType = function(str) {
  if (['true', 'false'].includes(str) || !isNaN(str)) {
    str = JSON.parse(str)
  }

  if (typeof str === 'string') {
    str = '"' + str + '"'
  }
  return str
}
