import request from '@/utils/request'

// 查询聚合文章
export function searchArticle(query: string, db: string[] | string, page: number, limit: number) {
    let dbStr = ''
    if (Array.isArray(db)) {

        for (let index = 0; index < db.length; index++) {
            dbStr += '&db=' + db[index]
        }
    } else {
        dbStr = '&db=' + db
    }
    const url = `/api/search?query=${query}&page=${page}&limit=${limit}${dbStr}`
    return request.get(url)
}

export function sendContent(data: { messages: { role: string, content: string }[] }) {

    return request({
        url: '/api/v1/chat/completions',
        headers: {
            isToken: false,
            repeatSubmit: false
        },
        method: 'post',
        data: data
    })
}

// 重排文章
export function rerankArticle(articles: string[], text: string) {
    return request({
        url: '/api/rerank',
        headers: {
            isToken: false,
            repeatSubmit: false
        },
        method: 'post',
        data: {
            documents: articles,
            query: text,
            top_n: 3
        }
    })

}