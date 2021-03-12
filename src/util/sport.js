import service from "@/util/request";

export function appSettingQuery() {
    return service({
        url: '/v1/ma/appSetting/query',
        method: 'post',
    })
}
export function queryUser(query) {
    return service({
        url: '/v1/sport/queryUser',
        method: 'post',
        params: query
    })
}
export function userAgree(query) {
    return service({
        url: '/v1/ma/userAgree',
        method: 'post',
        params: query
    })
}
export function userClose(query) {
    return service({
        url: '/v1/ma/userClose',
        method: 'post',
        params: query
    })
}
export function applyWithdrawal(query) {
    return service({
        url: '/v1/ma/applyWithdrawal',
        method: 'post',
        params: query
    })
}
export function sportSave(query) {
    return service({
        url: '/v1/sport/save',
        method: 'post',
        params: query
    })
}
export function sportList(query) {
    return service({
        url: '/v1/sport/list',
        method: 'post',
        params: query
    })
}
export function jdDel(query) {
    return service({
        url: '/v1/sport/del',
        method: 'post',
        params: query
    })
}
export function sportEdit(query) {
    return service({
        url: '/v1/sport/edit',
        method: 'post',
        params: query
    })
}
export function sportEditSave(query) {
    return service({
        url: '/v1/sport/editSave',
        method: 'post',
        params: query
    })
}
export function updateStatus(query) {
    return service({
        url: '/v1/sport/updateStatus',
        method: 'post',
        params: query
    })
}
export function run(query) {
    return service({
        url: '/v1/sport/run',
        method: 'post',
        params: query,
    })
}
export function queryUserChildren(query) {
    return service({
        url: '/v1/sport/queryUserChildren',
        method: 'post',
        params: query,
    })
}
