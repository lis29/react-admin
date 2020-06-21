import ajax from './ajax'

export function login(url, data) {
  return ajax(url, data, 'POST')
}