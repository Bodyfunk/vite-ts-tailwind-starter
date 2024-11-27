<template>
    <div class="go-home" @click="goHome">
        <el-icon :size="20">
            <ArrowLeftBold />
        </el-icon>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter()
const goHome = () => {
    router.push('/')
}
</script>

<style scoped>
.go-home {
    width: 40px;
    height: 40px;
    margin-bottom: 2em;
    border-radius: 40px;
    border: 1px solid #ccc;
    background-color: #ececec;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.go-home:hover {
    background-color: #f5f5f5;
}
</style>