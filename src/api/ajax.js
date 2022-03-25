import axios from 'axios'

export default function (url='', data={}, type='GET') {
  return new Promise(function (resolve, reject) {
    let promise

    if (type === 'GET') {
      // 拼接请求的参数
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })

      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))  // 除去最后一个&
        url = url + '?' + dataStr
      }

      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }

    promise.then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}