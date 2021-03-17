import service from "@/util/request";
export function toQrPay(query) {
    return service({
        url: '/v1/ali/toQrPay.jpg',
        method: 'post',
        params: query
    })
}
export function queryOrder(query) {
    return service({
        url: '/v1/ali/queryOrder',
        method: 'post',
        params: query
    })
}
