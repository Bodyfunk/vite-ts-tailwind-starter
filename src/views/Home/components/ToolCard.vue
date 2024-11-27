<template>
    <div class="card" @click="openLink(tool.router)">
        <div class="head">
            <el-icon :size="36" color="rgb(163 163 163)">
                <component :is="tool.icon"></component>
            </el-icon>
            <div class="title">{{ tool.name }}</div>
        </div>
        <div class="content">
            <div class="description">{{ tool.description }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IToolInfo } from '../data';

const { tool } = defineProps<{ tool: IToolInfo }>()
const router = useRouter()

const openLink = (link: string) => {
    router.push(link)
}
</script>

<style scoped>
.card {
    padding: 20px 24px;
    background: rgb(255, 255, 255);
    border-radius: 0.4em;
    box-shadow: 0.3em 0.3em 0.7em #00000015;
    transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: rgb(250, 250, 250) 0.2em solid;
    cursor: pointer;
}

.card:hover {
    border: #006fff 0.2em solid;
}

.head {
    display: flex;
    align-items: center;
}

.title {
    font-size: 1.125em;
    line-height: 1.75em;
    margin: 6px 10px;
}

.description {
    color: rgb(115, 115, 115);
    min-height: 4.5em;
    /* overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; */
}
</style>
