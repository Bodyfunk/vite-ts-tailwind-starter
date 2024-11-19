<template>
    <div class="search-result-page">
        <!-- <div class="search-result-header">{{ query.searchText }}</div> -->
        <div v-if="loading" class="search-result-content">
            <!-- 进度条 -->
            <el-steps style="max-width: 600px" :active="activeProcess" align-center finish-status="success">
                <el-step title="问题分析" />
                <el-step title="文库搜索" />
                <el-step title="整理答案" />
                <el-step title="完成" />
            </el-steps>
            <div>搜索中...</div>
            <el-skeleton :rows="5" animated />
        </div>

        <div v-if="!loading" class="search-result-content">
            <div v-if="showTime" class="search-time">
                <span v-if="showRef">搜索时间：{{ (endSearchTime - startTime) / 1000 }}s</span>
                <span>生成时间{{ (endGptTime - startTime) / 1000 }}s</span>
            </div>
            <div id="markdown-content" v-html="searchResultHTML"></div>
            <div v-if="showRef">
                <div class="ref-header">
                    <el-icon :size="24">
                        <Memo />
                    </el-icon>
                    <h2>
                        来源
                    </h2>
                </div>
                <ul>
                    <li v-for="item in articles" :key="item.link">
                        <a :href="item.link" target="_blank">{{ item.title }}</a>
                    </li>
                </ul>
            </div>
        </div>

    </div>

</template>

<script setup lang="ts">
import { useAiSearch, activeProcess, articles, analyzeResult, endSearchTime, endGptTime, showRef, loading, startTime, showTime, selectPage, selectLimit } from '@/utils/search';
import { useRouter } from 'vue-router';
import { computed, watchEffect } from 'vue';
import * as marked from 'marked';



const router = useRouter();
const query = router.currentRoute.value.query as {
    searchText: string
    selectScope?: string[],
    selectPage?: string,
};
console.log(query);

if (!query?.searchText) {
    router.push('/');
}
try {
    useAiSearch(query.searchText, query.selectScope, selectPage.value, selectLimit.value)
} catch (error) {
    console.log(error);
}

watchEffect(() => {
    if (activeProcess.value == 4) {
        loading.value = false;
    }
});

const searchResultHTML = computed(() => {
    return marked.parse(analyzeResult.value);
})




</script>

<style scoped>
.search-result-page {
    width: 100%;
    height: 100%;
    border-right: 8px;
    position: relative;
    overflow: auto;
}

.search-result-header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.search-result-content {
    width: 50vw;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);

}

.search-time {
    text-align: right;
    color: #b9b9b9;
    font-size: small;
}

.ref-header {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

h1 {
    font-size: 18px;
}

p {
    font-size: 14px;
}

a:link {
    color: #333;
    text-decoration: none;
}

a:visited {
    color: blue;
    text-decoration: none;
}

a:hover {
    color: blue;
    text-decoration: underline;
}

/* 自定义整个滚动条 */
::-webkit-scrollbar {
    width: 8px;
    /* 对于垂直滚动条，设置宽度 */
    height: 12px;
    /* 对于水平滚动条，设置高度 */
}

/* 自定义滚动条轨道 */
::-webkit-scrollbar-track {
    background: #f1f1f1;
    /* 轨道颜色 */
}

/* 自定义滚动条的滑块（thumb） */
::-webkit-scrollbar-thumb {
    background: #d3d2d2;
    /* 滑块颜色 */
    border-radius: 8px;
}

/* 当滑块悬停或活动时，可以设置不同的颜色 */
::-webkit-scrollbar-thumb:hover {
    background: #b9b9b9;
}
</style>
<style>
ol,
ul {
    margin-left: 2rem;
}
</style>