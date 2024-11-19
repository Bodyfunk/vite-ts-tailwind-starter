<template>
    <div class="aside-bar-container" :class="{ 'fold': !expand }">
        <div @click="() => expand = !expand">
            <el-icon v-if="expand" :size="24">
                <Fold />
            </el-icon>
            <el-icon v-else :size="24">
                <Expand />
            </el-icon>
        </div>
        <transition name="el-fade-in-linear">

            <div v-show="expand" class="return-home" @click="returnHome">
                <el-icon :size="20">
                    <Shop />
                </el-icon>
                <div>返回首页</div>
            </div>
        </transition>
        <transition name="el-fade-in-linear">

            <div v-show="expand" class="return-home" @click="gotoNews">
                <el-icon :size="20">
                    <Reading />
                </el-icon>
                <div>世界新闻</div>
            </div>
        </transition>
        <transition name="el-fade-in-linear">
            <div v-show="expand" class="history-container">
                <div class="history-header">
                    <el-icon>
                        <ArrowDownBold />
                    </el-icon>
                    <div>最近的AI搜索</div>
                </div>
                <div class="history-list">
                    <el-scrollbar>
                        <div v-for="(item, index) in searchHistory" class="history-item" :class="{
                            'hideHistory': index === searchHistory.length - 1
                        }" @click="gotoResult(item)">
                            <div class="history-item-icon"></div>
                            <div class="history-item-content">{{ item }}</div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </transition>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { searchHistory, selectScope, selectPage, skipRecord, useAiSearch, searchText, selectLimit } from '@/utils/search';
import { useRouter } from 'vue-router';

const expand = ref(true);

const router = useRouter();
const gotoResult = (item: string) => {
    skipRecord.value = true;
    if (router.currentRoute.value.path.includes('SearchResult')) {
        useAiSearch(item, selectScope.value, selectPage.value, selectLimit.value);
        return
    }
    router.push({
        name: 'SearchResult',
        query: {
            searchText: item,
            selectScope: selectScope.value,
            selectPage: selectPage.value
        }
    })
}

const returnHome = () => {
    searchText.value = '';
    router.push('/')
}

const gotoNews = () => {
    searchText.value = '';
    router.push('/news')
}


</script>

<style scoped>
.aside-bar-container {
    box-sizing: border-box;
    width: 200px;
    height: 100%;
    background-color: #f5f5f5;
    padding: 20px;

    transition: all 0.2s linear;
}

.fold {
    width: 80px;
}

.return-home {
    width: 100px;
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;
    cursor: pointer;
}

.return-home:hover {
    background-color: #BEBEBE;
}

.history-container {
    width: 160px;
}

.history-list {
    padding-left: 5px;
    height: 50vh;
    overflow-y: auto;
}

.history-header {
    margin-top: 10px;
}

.history-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.history-item {
    display: flex;
}

.hideHistory {
    display: none;
}

.heighLight {
    background-color: #CEDAE0;
}

.history-item:hover {
    background-color: #BEBEBE;
    cursor: pointer;
}

.history-item-icon {
    width: 5px;
    height: 24px;
    margin-right: 5px;
    background-color: #BEBEBE;
}

.heighLightIcon {
    background-color: #7F83F7;
}

.history-item-content {
    /* 三点省略号 */
    width: 10rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>