import service from "@/util/request";

export function queryUser(query) {
    return service({
        url: '/v1/ma/queryUser',
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
export function save(query) {
    return service({
        url: '/v1/music/save',
        method: 'post',
        params: query
    })
}
export function musicList(query) {
    return service({
        url: '/v1/music/list',
        method: 'post',
        params: query
    })
}
export function jdDel(query) {
    return service({
        url: '/v1/jd/del',
        method: 'post',
        params: query
    })
}
export function musicEditSave(query) {
    return service({
        url: '/v1/music/editSave',
        method: 'post',
        params: query
    })
}
export function run(query) {
    return service({
        url: '/v1/music/run',
        method: 'post',
        params: query,
    })
}
