import axios from 'axios'
import { getters, dispatch } from '@/commons/storeUtils'

// ajax에서 에러 감지 안하는 API 목록
const errorPassRegexpUrl = [
  // '/api/v3/reservations/\\d+', // 미팅룸 취소
]

class Ajax {
  constructor (options = { isMultipart: false, isPortal: false }) {
    this._options = options
  }

  url(url) {
    if (!/^http.+/.test(url)) {
      url = `${url}`
    }
    if (/^\/api\/v3\//.test(url)) {
      url = `${process.env.VUE_APP_NODESERVER}${url}`
    }
    this._options.url = `${url}`
    return this
  }

  method(method) {
    this._options.method = method
    return this
  }

  headers (headers) {
    if (headers?.isMultipart) {
      this._options.headers = { 'Content-Type': 'multipart/form-data' }
    } else {
      this._options.headers = headers
    }
    return this
  }

  data(data, dataNoEncrypt) {
    if (data) {
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(this._options.method.toUpperCase())) {
        if (this._options.isMultipart) { // 파일업로드 일 때
          this._options.data = data
        } else {
          if (dataNoEncrypt) {
            this._options.data = JSON.stringify(data)
          } else {
            this._options.data = data
          }
        }
      } else {
        this._options.params = data
      }
    }
    return this
  }

  timeout (time) {
    this._options.timeout = time
    return this
  }

  responseType(responseType) {
    if (responseType) {
      this._options.responseType = responseType
    }
    return this
  }

  // 헤더 정보 정리.
  _makeInstance() {
    // const baseURL = this._options.url.includes('v3') ? process.env.VUE_APP_NODESERVER : process.env.VUE_APP_URL
    // const instance = axios.create({ baseURL })
    const instance = axios.create()

    instance.defaults.timeout = this._options.timeout
    instance.defaults.headers = {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
    instance.defaults.headers.Pragma = 'no-cache' // IE11용
    instance.defaults.headers['Access-Control-Allow-Origin'] = '*'
    instance.defaults.headers['Access-Control-Allow-Headers'] = 'X-Requested-With'

    if (!location.href.includes('login')) {
      const jwtToken = getters('login/userInfoJwtToken')
      let tempToken
      if (jwtToken) {
        if (this._options.isPortal) {
          tempToken = jwtToken
        } else {
          tempToken = `Bearer ${jwtToken}`
        }
        instance.defaults.headers.Authorization = tempToken
      }
    }

    return instance
  }

  async promise() {
    try {
      const res = await this._makeInstance().request(this._options)
      const data = res.data
      const code = data.code || 0
      let errorMsg = ''
      if (code) {
        errorMsg = data.message
      } else if (JSON.stringify(data).includes('error')) {
        if (data.result) {
          const result = JSON.parse(data.result)
          errorMsg = result.error
        } else if (data.rtn_message === 'error') {
          errorMsg = data.rtn_message
        }
      } else if (data.rtn_code !== 0) {
        if (data.rtn_code === -14) {
          if (!window.$root.$isOpenDialog()) {
            await window.$root.$alert('계정 정보가 변경되어 로그아웃됩니다.<br> 올바른 계정으로 재로그인 해주세요.')
            window.$root.$loadingOff()
            dispatch('logout')
            location.reload()
          }
          return false
        }
        errorMsg = data.rtn_message
      }

      errorMsg && await errorMessage(errorMsg, res)
      return res
    } catch (e) {
      await Promise.reject(e)
    }
  }
}

/**
 * @param {string} url ajax url
 * @param {string} method get, post, put, patch, delete
 * @param {Object} data datas
 * @param {Object} params options
 * @returns {Object} response | response.data
 */
export async function ajax(url, method = 'get', data, params = { timeout: 30000, returnPromise: false }) {
  const { timeout, returnPromise, headers, isMultipart, isPortal, responseType, dataNoEncrypt } = params
  try {
    const res = await new Ajax({ isMultipart, isPortal }).headers(headers).url(url).method(method).responseType(responseType).timeout(timeout).data(data, dataNoEncrypt).promise()
    return returnPromise ? res : res.data.result || res.data
  } catch (res) {
    let errorMsg = 'error'
    if (res.config.url === '/api/v3/companies/list' && res?.response?.data?.message === '잘못된 관리자 등급입니다.') {
      if (!window.$root.$isOpenDialog()) {
        await window.$root.$alert('계정 정보가 변경되어 로그아웃됩니다.<br> 올바른 계정으로 재로그인 해주세요.')
        window.$root.$loadingOff()
        dispatch('logout')
        location.reload()
      }
      return false
    } else if (res?.response?.data?.message) {
      errorMsg = res?.response?.data?.message
    } else if (res?.response?.data === '') {
      errorMsg = [res.response.status, res.response.statusText].join(', ')
    }
    await errorMessage(errorMsg, res)
    res.errorMsg = errorMsg
    res.error = true
    return res
  }
}

async function errorMessage(msg, res) {
  console.log(msg, res)
  const url = res.config.url.split('?')[0]
  if (errorPassRegexpUrl.every(regexp => !new RegExp(`^${regexp}$`).test(url))) {
    await window.$root.$alert(msg)
    res && console.log(res.config.url.split('?')[0], res.data)
    if (location.pathname !== '/') {
      moveMain()
    }
  }
}

function moveMain() {
  const $root = window.$root
  // that.$utils.goRouter(that, { name: 'main' })
  $root.$nextTick(() => {
    const body = document.querySelector('body.scrollLock')
    if (body) {
      body.classList.remove('scrollLock')
    }
    $root.$loadingOff()
  })
}
