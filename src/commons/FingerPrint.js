import Fingerprintjs2 from 'fingerprintjs2' // https://github.com/Valve/fingerprintjs2
import UAParser from 'ua-parser-js' // https://github.com/faisalman/ua-parser-js
/**
 * 기다리기
 * @param time {number} 밀리초
 */
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

/**
 * Fingerprint (Promise)
 * @type {Promise<string>}
 */
let fingerprintPromise

/**
 * Fingerprint 생성하기
 * @type {Promise<string>}
 */
function generateFingerprint() {
  return new Promise(resolve => {
    Fingerprintjs2.get({
      // https://github.com/Valve/fingerprintjs2#preprocessor
      preprocessor(key, value) {
        if (key === 'userAgent') {
          // https://github.com/faisalman/ua-parser-js
          const parser = new UAParser(value)
          return `${parser.getOS().name},${parser.getOS().version},${parser.getBrowser().name},${parser.getDevice().vendor},${parser.getDevice().model}`
        }
        return value
      },
      // https://github.com/Valve/fingerprintjs2/issues/468
      audio: {
        timeout: 3000
      },
      // https://github.com/Valve/fingerprintjs2/wiki/Stable-components
      excludes: {
        userAgent: false,
        canvas: true,
        webgl: true,
        plugins: true,
        enumerateDevices: true,
        pixelRatio: true,
        screenResolution: true,
        availableScreenResolution: true,
        doNotTrack: true,
        fontsFlash: true,
        webdriver: false // v2.1.0부터 추가 : https://github.com/Valve/fingerprintjs2/releases/tag/2.1.0
      }
    }, components => {
      const find = components.map(v => v.value)
      resolve(Fingerprintjs2.x64hash128(find.join(''), 31))
    })
  })
}

/**
 * Fingerprint 가져오기
 * @type {Promise<string>}
 */
export async function getFingerprint() {
  if (fingerprintPromise === undefined) {
    fingerprintPromise = sleep(500).then(generateFingerprint)
  }

  return new Promise(resolve => {
    fingerprintPromise.then(resolve)
  })
}
