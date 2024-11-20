import request from '@/utils/request'

// 查询聚合文章
export function translateText(query: string, src: string, target: string) {
    const data = {
        text: query,
        src: src,
        dst: target
    }
    return request({
        url: '/api/fanyi',
        method: 'post',
        data
    })
}