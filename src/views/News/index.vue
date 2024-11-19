<template>
    <div class="searchInput">
        <div class="mt-4">
            <el-input v-model="inputQuery" :clearable="true" style="width: 400px" placeholder="Please input"
                class="input-with-select" @change="handleSearchChange" @clear="handleSearchClear">
                <template #prepend>
                    <el-select v-model="selectedTab" placeholder="Select" style="width: 115px"
                        @change="handleTabChange">
                        <el-option v-for="(item, index) in tabs" :key="index" :label="item.label" :value="item.name" />
                    </el-select>
                </template>
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </div>
    </div>
    <div v-show="!notObserver" class="newsTabs">
        <div @click="handleTabChange(item.name)" v-for="(item, index) in tabs" :key="index"
            :class="{ 'active': selectedTab === item.name, 'tabItem': true }">{{ item.label }}</div>
    </div>
    <div class="newsContainer" v-loading="loading">
        <div v-masonry fit-width="true" column-width=".item" transition-duration="0.3s" item-selector=".item"
            class="masonryContainer" :gutter="10">
            <NewsCard v-masonry-tile v-for="(item, index) in articles" :key="index" :news="item" class="item" />
        </div>
        <div ref="loadMoreTrigger" class="load-more"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import NewsCard from './components/NewsCard.vue';
import { articles, selectedTab, tabs, inputQuery, INewsItem } from './data';
import { getNewsList } from '@/api/news';
import { Search } from '@element-plus/icons-vue'
import { rerankArticle, searchArticle, sendContent } from '@/api/aiSearch';

const loadMoreTrigger = ref<HTMLDivElement | null>(null);
const notObserver = ref(false);
const loading = ref(false);
// 当前页数
let currentPage = 1;

const handleTabChange = (tabName: string) => {
    currentPage = 1;
    articles.value = [];
    selectedTab.value = tabName;
    loadArticles();
}

const ch2en = async (text: string) => {
    const query = `Translate ${text} into English.`
    const data = {
        messages: [{
            role: 'user',
            content: query,
        }]
    }
    const res = await sendContent(data)
    return res.choices.at(0).message.content.replace('\'s', '')
}

// 抓取相关文章
const getRelatedArticles = async (text: string, db: string[] | string = ['cbsnews.db'], page = 20, limit = 10000) => {
    const res = await searchArticle(text, db, page, limit)
    const articleLinks: INewsItem[] = []

    for (const key in res.data) {
        if (Object.prototype.hasOwnProperty.call(res.data, key)) {
            const element = res.data[key];
            articleLinks.push({
                link: element.link,
                author: element.author,
                img: element.img,
                time: element.time,
                title: element.title,
                articleAbstract: element.abstract
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
    return articleLinks
}

// 重排序文章
const sortArticles = async (contents: INewsItem[], text: string) => {
    const res = await rerankArticle(contents.map(item => item.articleAbstract), text)
    const sortList = res.results.sort((a: { relevance_score: number }, b: { relevance_score: number }) => b.relevance_score - a.relevance_score)
    const sortedArticles = []
    for (const item of sortList) {
        sortedArticles.push(contents[item.index])
    }

    return sortedArticles
}

const handleSearchChange = async () => {
    if (inputQuery.value.trim() === '') {
        return;
    }
    notObserver.value = true;
    loading.value = true;
    currentPage = 1;
    articles.value = [];
    try {
        const ch2enResult = await ch2en(inputQuery.value)
        const articlesRes = await getRelatedArticles(ch2enResult, selectedTab.value, 50, 100000)
        const sortedArticles = await sortArticles(articlesRes, inputQuery.value)
        articles.value = sortedArticles
    } catch (error) {
    } finally {
        loading.value = false;
    }
}

const handleSearchClear = () => {
    notObserver.value = false;
    handleTabChange('cbsnews.db');
}



const loadArticles = async () => {
    if (notObserver.value) {
        return;
    }
    // 调用API加载更多的文章
    const res = await getNewsList(currentPage, 30, selectedTab.value)
    if (res.code === 0 && res.data.records.length > 0) {
        articles.value.push(...res.data.records);
        currentPage++;
    }
};

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadArticles();
    }
});

onMounted(() => {
    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value);
    }
});

nextTick(() => {
    // 当数据变化后确保重新创建观察者
    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value);
    }
});
</script>

<style scoped>
/* .masonry {
    padding: 10px;
    column-count: 4;
    column-gap: 10px;
} */

.load-more {
    height: 20px;
    width: 100%;
}

/* @media screen and (max-width: 1200px) {
    .masonry {
        column-count: 3;
    }
}

@media screen and (max-width: 750px) {
    .masonry {
        column-count: 2;
    }
} */
.searchInput {
    position: absolute;
    top: 20px;
    left: 40%;
}

.newsTabs {
    position: sticky;
    display: flex;

    .tabItem {
        border-radius: 24px;
        margin: 12px 24px;
        padding: 0 12px;
        cursor: pointer;

        &:hover {
            background-color: rgb(0 0 0 / 3%);
        }
    }

    .active {
        color: #333;
        font-weight: bold;
        background-color: rgb(0 0 0 / 3%);
    }

}

.newsContainer {
    width: 100%;
    height: calc(100vh - 128px);
    overflow: auto;
}

.masonryContainer {
    margin: 0 auto;
}

.item {
    width: 100%;
    max-width: 300px;
    margin-bottom: 10px;
}
</style>
