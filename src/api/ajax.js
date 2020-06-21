import axios from 'axios'
import { message } from 'antd'
// axios.defaults.baseURL = 'http://localhost:3000'
export default function ajax(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    let innerPromise
    if (method === 'GET') {
      innerPromise = axios.get(url, {
        params: data
      })
    }
    else if (method === 'POST') {
      innerPromise = axios.post(url, data)
    }

    innerPromise.then(response => {
      resolve(response.data)
    }).catch(err => {
      message.error('This is an error message');
    })
  })
}
