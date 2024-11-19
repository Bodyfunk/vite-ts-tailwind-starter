<template>
    <div class="card" @click="openLink(news.link)">
        <img :src="news.img" alt="">
        <div class="content">
            <div class="title">{{ news.title }}</div>
            <div v-show="news.author" class="author">
                <el-icon>
                    <UserFilled />
                </el-icon>
                {{ news.author }}
            </div>
            <div class="time">{{ new Date(news.time).toLocaleString() }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { INewsItem } from '../data';
const { news } = defineProps<{ news: INewsItem }>()

const openLink = (link: string) => {
    window.open(link, '_blank')
}
</script>

<style scoped>
.card {
    margin: 12px 6px;
    background-color: aliceblue;
    border-radius: 6px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    height: fit-content;
    overflow: hidden;
    position: relative;

    img {
        width: 100%;
        height: auto;
        object-fit: contain;
    }

    .title {
        word-wrap: break-word;
        word-break: break-all;
        font-size: 16px;
        text-align: left;
    }

    .author {
        margin: 6px 0;
        font-size: 14px;
        text-align: right;
    }

    .time {
        margin: 6px 0;
        font-size: 14px;
        text-align: right;
    }
}

.card:hover {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
}

.content {
    margin: 6px;
}
</style>
