<template>
    <div class="search-box">
        <el-input v-model="searchText" type="textarea" placeholder="请输入" style="width: 100%;" :rows="3">
        </el-input>
        <div class="search-box-footer">
            <div class="footer-left">

                <div>
                    <el-select v-model="selectScope" size="small" multiple collapse-tags placeholder="是否联库检索"
                        style="width: 120px">
                        <el-option v-for="item in scopeList" :disabled="item.disabled" :key="item.value"
                            :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div>
                    <el-select v-model="selectPage" size="small" collapse-tags placeholder="文章数量" style="width: 100px">
                        <el-option v-for="item in pageList" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div>
                    <el-select v-model="selectLimit" size="small" collapse-tags placeholder="文章总数" style="width: 100px">
                        <el-option v-for="item in limitList" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>
            </div>
            <div class="footer-right">
                <div class="search-btn" @click="gotoSearch">
                    <el-icon :size="20">
                        <Right />
                    </el-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { searchText, selectScope, selectPage, selectLimit } from '@/utils/search';
import { scopeList, pageList, limitList } from '../data'
import { useRouter } from 'vue-router';

const router = useRouter()

const gotoSearch = () => {
    router.push({
        name: 'SearchResult',
        query: {
            searchText: searchText.value,
            selectScope: selectScope.value,
            selectPage: selectPage.value
        }
    })
}

</script>

<style scoped>
:deep(.el-textarea__inner) {
    resize: none;
    background-color: rgb(0, 0, 0, 0);
    box-shadow: none;
}

.search-box-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 6px;
}

.footer-left {
    display: flex;
    align-items: center;
}

.footer-right {

    .search-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #6C6C6C;
        color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .search-btn:hover {
        background-color: #000;
    }
}
</style>