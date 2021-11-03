
const keyPrefix = 'zjbim-'
/**
 * 存储localStorage
 */
export const setItem = (key, value, type = '') => {
  key = keyPrefix + key
  if (type) window.sessionStorage.setItem(key, value)
  else window.localStorage.setItem(key, value)
}
/**
 * 获取localStorage
 */
export const getItem = (key, type = '') => {
  let value = '';
  key = keyPrefix + key
  if (type) {
    value = window.sessionStorage.getItem(key)
  } else {
    value = window.localStorage.getItem(key)
  }
  return value
}
/**
 * 删除localStorage
 */
export const removeItem = (key, type = '') => {
  key = keyPrefix + key
  if (type) {
    window.sessionStorage.removeItem(key)
  } else {
    window.localStorage.removeItem(key)
  }
}

/**
 * 清空全部localStorage
 */
export const clear = (type = '') => {
  if (type) {
    window.sessionStorage.clear()
  } else {
    window.localStorage.clear()
  }
}
