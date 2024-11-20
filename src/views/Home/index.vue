<template>
    <div class="home-page">
        <div class="home-page-content grid">
            <div v-for="(item, index) in tools" :key="index" class="home-page-item">
                <ToolCard :tool="item" />
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import ToolCard from './components/ToolCard.vue';
import { tools } from './data'


</script>

<style scoped>
.home-page {
    width: 100%;
    padding: 24px;
    position: relative;
    background-color: #f1f5f9;
    overflow: auto;
}

.grid {
    display: grid;
    gap: 12px;
}

.home-page-content {
    grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 640px) {
    .home-page-content {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
}

@media (min-width: 768px) {
    .home-page-content {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (min-width: 1024px) {
    .home-page-content {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (min-width: 1280px) {
    .home-page-content {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}
</style>