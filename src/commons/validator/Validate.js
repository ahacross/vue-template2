const getVm = (that, field) => {
  return that.$refs[field]
}

export function validate(that) {
  let result = true
  const validateRules = that.rules
  const refNames = that.$utils.getKeys(validateRules)

  for (const field of refNames) {
    const vm = getVm(that, field)
    const rules = validateRules[field]
    vm.msgValidate = ''

    if (rules) {
      const value = vm.value
      for (const rule of rules) {
        result = validateOne(value, rule, vm, null, that)
        if (!result) {
          break
        }
      }
    }
    if (!result) {
      break
    }
  }
  return result
}

function validateCheck(value, rule, parentVm) {
  let result
  if (rule.regexp) {
    result = new RegExp(rule.regexp).test(value)
  } else if (rule.compare) {
    result = parentVm[rule.compare] === value
  }
  return result
}

export function validateOne(value, rule, vm, msgInit, parentVm) {
  if (rule.once) {
    rule.setMsg(vm)
  }

  const result = validateCheck(value, rule, parentVm)

  if (msgInit) {
    vm.msgValidate = ''
  }

  if (!result) {
    vm.msgValidate += `${rule.msg}\n`
  }

  if (rule.isReplace) {
    const replaceValue = rule.replace(value, rule)
    vm.$el.querySelector('input').setAttribute('value', replaceValue)
    vm.setValue(replaceValue)
  }
  return result
}

export function validateTarget(parentVm, e) {
  const name = e.target.name
  const value = parentVm[name]
  const rules = parentVm.rules[name]
  const vm = parentVm.$refs[name]
  let result

  for (const rule of rules) {
    result = validateOne(value, rule, vm, true, parentVm)
    if (!result) {
      break
    }
  }

  return result
}

export function replaceValue(value, rule) {
  return value.replace(new RegExp(`[^${rule}]`, 'g'), '')
}

export function validateCustom(that, arr) {
  const rules = that.rules

  return arr.every(name => {
    let result
    const nameRules = rules[name]
    const value = that[name]
    if (nameRules) {
      for (const rule of nameRules) {
        result = validateCheck(value, rule, that)
      }
    } else {
      result = value !== ''
    }

    return result
  })
}

export function validateEmpty(that, arr) {
  return arr.every(name => {
    return that[name] === ''
  })
}
