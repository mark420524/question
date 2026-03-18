import { apiUrl, TOKEN } from '@/utils/constant'

export function http(params) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: apiUrl + params.url,
      data: params.data,
      header: params.header || {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-token-zaowanda': TOKEN,
        'X-token-user': uni.getStorageSync('userToken')
      },
      method: params.method || 'POST',
      dataType: params.dataType,
      responseType: params.responseType,
      success(res) {
        if (res.statusCode === 200) {
          let data = res.data
          if (data.code === 0) {
            resolve(data.data)
          } else {
            errorToast(data.message)
            reject(data)
          }
        } else {
          const msg = res.data?.message || '接口异常'
          errorToast(msg)
          reject(res)
        }
      },
      fail(e) {
        errorToast('请求失败')
        reject(e)
      }
    })
  })
}

export function uploadFile(params) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: apiUrl + params.url,
      filePath: params.data.filePath,
      name: params.data.name || 'file',
      formData: params.data,
      header: params.header || {
        'Content-Type': 'multipart/form-data',
        'X-token-zaowanda': TOKEN,
        'X-token-user': uni.getStorageSync('userToken')
      },
      success(res) {
        if (res.statusCode === 200) {
          let data = res.data
          if (typeof data === 'string') {
            try {
              data = JSON.parse(data)
            } catch (e) {
              // ignore
            }
          }
          if (data.code === 0) {
            resolve(data.data)
          } else {
            errorToast(data.message)
            reject(data)
          }
        } else {
          errorToast('上传失败')
          reject(res)
        }
      },
      fail(e) {
        errorToast('上传失败')
        reject(e)
      }
    })
  })
}

function errorToast(message) {
  uni.showToast({
    title: message || '错误',
    icon: 'none'
  })
}
