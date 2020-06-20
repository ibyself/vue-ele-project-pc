import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/admin/user/userlist',
    method: 'get',
    params
  })
}
export function delUser(params){
    return request({
        url: '/admin/user/deluser',
        method: 'get',
        params
    })
}
export function userInfo(params){
    return request({
        url: '/admin/user/userinfo',
        method: 'get',
        params
    })
}
export function roleList(params){
    return request({
        url: '/admin/role/rolelist',
        method: 'get',
        params
    })
}
export function updateUser(data){
    return request({
        url:'/admin/user/updateUser',
        method:'post',
        data:data
    })
}
export function addUser(data){
    return request({
        url:'/admin/user/addUser',
        method:'post',
        data:data
    })
}