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

export function roleList(params){
    return request({
        url: '/admin/role/rolelist',
        method: 'get',
        params
    })
}
export function addRole(data){
    return request({
        url:'/admin/role/addRole',
        method:'post',
        data:data
    })
}

export function editRole(data){
    return request({
        url:'/admin/role/editRole',
        method:'post',
        data:data
    })
}

export function delRole(params){
    return request({
        url: '/admin/role/delRole',
        method: 'get',
        params
    })
}

export function ruleList(params) {
    return request({
      url: '/admin/rule/rulelist',
      method: 'get',
      params
    })
}

export function addRule(data){
    return request({
        url:'/admin/rule/addRule',
        method:'post',
        data:data
    })
}

export function editRule(data){
    return request({
        url:'/admin/rule/editRule',
        method:'post',
        data:data
    })
}

export function delRule(params){
    return request({
        url: '/admin/rule/delRule',
        method: 'get',
        params
    })
}