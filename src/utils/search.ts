// 搜索逻辑

import { rerankArticle, searchArticle, sendContent } from "@/api/aiSearch.ts"
import { ref } from "vue"
import { fetchEventSource } from "@microsoft/fetch-event-source"
import cache from "@/plugins/cache.js"
import { chatMsg_articles, chatMsg_title, chatMsg_translate } from "./chatMsg.ts"

export const searchText = ref('')
export const selectScope = ref<string[]>([])
export const selectPage = ref()
export const selectLimit = ref()
export const activeProcess = ref(0);
export const articles = ref<{ title: string, link: string }[]>()
export const analyzeResult = ref('')
export const showRef = ref(false)
export const searchHistory = ref((cache.local.get('searchHistory') || '').split('@@@').reverse());
export const skipRecord = ref(false)
export const loading = ref(true);

// 时间戳
export const showTime = ref(false)
export const startTime = ref(new Date().getTime())
export const endSearchTime = ref(new Date().getTime())
export const endGptTime = ref(new Date().getTime())

interface IArticle {
    content: string
    link: string
    title: string
    abstract: string
}

// 1.输入翻译成英文
export const ch2en = async (text: string) => {
    searchText.value = text
    // const query = `Translate the following sentence into English. ${text}`
    const query = {
        messages: chatMsg_translate(text),
    }
    const res = await sendContent(query)
    activeProcess.value = 1
    return res.choices.at(0).message.content.replace('\'s', '')
}

// 2.抓取相关文章
export const getRelatedArticles = async (text: string, db: string[] | string = ['cbsnews.db'], page = 20, limit = 10000) => {
    const res = await searchArticle(text, db, page, limit)
    const articleLinks: IArticle[] = []
    articles.value = []

    for (const key in res.data) {
        if (Object.prototype.hasOwnProperty.call(res.data, key)) {
            const element = res.data[key];
            articleLinks.push({
                content: element.content.replaceAll('\'s', ''),
                link: element.link,
                title: element.title,
                abstract: element.abstract
            })
        }
    }
    // 数组去重
    for (let i = 0; i < articleLinks.length; i++) {
        for (let j = i + 1; j < articleLinks.length; j++) {
            if (articleLinks[i].link === articleLinks[j].link) {
                articleLinks.splice(j, 1)
                j--
            }
        }
    }
    activeProcess.value = 2
    return articleLinks
}

// 2.1.重排序文章
export const sortArticles = async (contents: IArticle[], text: string) => {
    const res = await rerankArticle(contents.map(item => item.abstract), text)
    const sortList = res.results.sort((a: { relevance_score: number }, b: { relevance_score: number }) => b.relevance_score - a.relevance_score)
    const sortedArticles = []
    for (const item of sortList) {
        sortedArticles.push(contents[item.index])
    }
    articles.value = sortedArticles.map(item => ({ title: item.title, link: item.link }))
    console.log(sortList);

    return sortedArticles.map(item => item.abstract)
}

// 3.流式接受gpt返回结果
function fetchEventStream(articles: string[] | string) {
    let query
    if (Array.isArray(articles)) {
        // query = `Please refer to the following article, write a research report with ${searchText.value} as the title, translate it into Chinese, and return it in markdown format. ${articles.join(' ')}`
        query = chatMsg_articles(articles, searchText.value)
    } else {
        query = chatMsg_title(articles)
    }
    const data = {
        messages: query,
        stream: true
    }
    // 使用fetch API发送请求
    fetchEventSource('/api/v1/chat/completions', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
        },
        // 确保响应是流的形式
        keepalive: true,
        body: JSON.stringify(data),
        onopen: (e) => {
            return new Promise((resolve, reject) => {
                activeProcess.value = 3
                activeProcess.value = 4
                resolve()
            })
        },
        onmessage: (event) => {
            if (event.data === '[DONE]') return;

            const message = JSON.parse(event.data)
            if (message.choices) {
                analyzeResult.value = analyzeResult.value + (message.choices.at(0).delta.content ?? '');
            }

        },
        onerror: (error) => {
            console.error('Connection error', error)
            throw error
        },
        onclose: () => {
            console.log('Connection closed')
            endGptTime.value = new Date().getTime()
            showRef.value = selectScope.value.length > 0
            showTime.value = true
        }
    })

}


export const useAiSearch = async (text: string, db?: string[] | string, page = 10, limit = 1000) => {
    initData()
    if (Array.isArray(db) && db.length > 0) {
        selectScope.value = db || []
    }
    if (typeof db === 'string' && db) {
        selectScope.value = [db]
    }

    startTime.value = new Date().getTime()
    // 不联库检索的话，直接发给gpt
    if (db?.length === 0) {
        fetchEventStream(text)
        return
    }

    const ch2enResult = await ch2en(text)
    const articles = await getRelatedArticles(ch2enResult, db, page, limit)
    endSearchTime.value = new Date().getTime()
    // 存本地缓存
    if (!skipRecord.value) {
        const searchHistoryCache = (cache.local.get('searchHistory') || '').split('@@@')
        searchHistoryCache.push(text)
        cache.local.set('searchHistory', searchHistoryCache.join('@@@'))
        searchHistory.value = searchHistoryCache.reverse()
    }
    skipRecord.value = false

    // 排序文章
    const sortedArticles = await sortArticles(articles, ch2enResult)
    console.log(sortedArticles);

    // 发送给gpt
    fetchEventStream(sortedArticles);

}

// 初始化
const initData = () => {
    loading.value = true
    activeProcess.value = 0
    analyzeResult.value = ''
    showRef.value = false
    showTime.value = false
}