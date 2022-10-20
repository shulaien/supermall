import { request } from "./request";

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

// export function getHomeGoods(type, page) {
//     return request({
//         url: 'https://www.blogry.cn/test/index',
//         params: {
//             type,
//             page
//         }
//     })
// }