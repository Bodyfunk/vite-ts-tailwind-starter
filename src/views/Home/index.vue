<template>
    <div class="home-page">
        <div class="home-page-content">
            <h1>通用AI搜索</h1>
            <h2>AI聚合,一键直达</h2>
            <div class="search-box">
                <SearchBox></SearchBox>
            </div>
            <div class="search-hot-box">

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import SearchBox from './components/SearchBox.vue';


</script>

<style scoped>
h1 {
    font-size: 72px;
    color: #7F83F7;
    font-weight: bold;
}

h2 {
    font-size: 48px;
    color: #BEBEBE;
    font-weight: bold;
}

.home-page {
    width: 100%;
    height: 100%;
    position: relative;
}

.home-page-content {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.search-box {
    width: 40vw;
    max-width: 800px;
    min-width: 300px;
    height: 120px;
    background-color: #EFEFEF;
    border: 1px solid #BEBEBE;
    border-radius: 12px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
}

.search-hot-box {}
</style>