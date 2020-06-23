import request from '@/utils/request'
export function categoryList(params){
    return request({
        url: '/admin/shop/categoryList',
        method: 'get',
        params
    })
}
export function addCategory(data){
    return request({
        url:'/admin/shop/addCategory',
        method:'post',
        data:data
    })
}

export function editCategory(data){
    return request({
        url:'/admin/shop/editCategory',
        method:'post',
        data:data
    })
}

export function delCategory(params){
    return request({
        url: '/admin/shop/delCategory',
        method: 'get',
        params
    })
}

export function productList(params) {
    return request({
      url: '/admin/shop/productList',
      method: 'get',
      params
    })
}

export function addProduct(data){
    return request({
        url:'/admin/shop/addProduct',
        method:'post',
        data:data
    })
}

export function editProduct(data){
    return request({
        url:'/admin/shop/editProduct',
        method:'post',
        data:data
    })
}

export function delProduct(params){
    return request({
        url: '/admin/shop/delProduct',
        method: 'get',
        params
    })
}