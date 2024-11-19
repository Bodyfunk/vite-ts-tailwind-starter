import request from '@/utils/request'

// 获取新闻列表
export function getNewsList(currentPage: number, size: number, db = 'cbsnews.db') {
    const url = `/api/test/v1/posts/list?db=${db}&currentPage=${currentPage}&size=${size}`
    return request.get(url)
}