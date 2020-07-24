import ajax from './ajax'
import { message } from 'antd'

export function login(url, data) {
  return ajax(url, data, 'POST')
}

export function reqCategory(parentId = 0) {
  return new Promise((resolve, reject) => {
    ajax('/manage/category/list', { parentId }, 'GET').then(resp => {
      if (resp.status === 0) {
        resolve(resp.data)
      } else {
        reject("获取商品分类失败")
      }
    })
  })
}


export function reqAddCategory(data) {
  // status
  return new Promise((resolve, reject) => {
    ajax('/manage/category/add', data, 'POST').then(resp => {
      if (resp.status === 0) {
        resolve(resp)
      } else {
        message.error(resp.msg)
      }
    })
  })
}


export function reqUpdateCategory(data) {
  return new Promise((resolve, reject) => {
    ajax('/manage/category/update', data, 'POST').then(resp => {
      if (resp.status === 0) {
        resolve(resp)
      }
      else {
        message.error('修改分类名失败！')
      }
    })
  })
}


export function reqProductList(data) {
  return new Promise((resolve, reject) => {
    ajax('/manage/product/list', data).then(resp => {
      if (resp.status === 0) {
        resolve(resp.data)
      }
      else {
        message.error(resp.msg)
      }
    })
  })
}



export function reqUpdateStatus(productId, status) {
  return ajax('/manage/product/updateStatus', { productId: productId, status: status }, 'POST')
}


export function reqAddProduct(product) {
  return ajax('/manage/product/add', product, 'POST')
}



export function reqRoleList() {
  return ajax('/manage/role/list', 'GET')
}


export function reqAddRole(roleName) {
  return ajax("/manage/role/add", { roleName }, 'POST')
}


export function reqUpdateRole(data) {
  return ajax('/manage/role/update', data, 'POST')
}