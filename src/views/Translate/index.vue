<template>
    <div class="translate-page">
        <div class="translate-language">
            <el-select v-model="sourceLanguage" placeholder="Select language">
                <el-option v-for="item in languageList" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
            <el-icon style="margin: 0 16px;">
                <Switch />
            </el-icon>
            <el-select v-model="targetLanguage" placeholder="Select language">
                <el-option v-for="item in languageList" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
        </div>
        <div class="translate-input-box">
            <div class="translate-input">
                <el-input v-model="textInput" :rows="20" style="width: 100%" resize="none" type="textarea"
                    placeholder="请输入文本" :input-style="{ 'font-size': '1.275em', lineHeight: '1.75em' }"
                    @change="debounceHandleTranslating(textInput, sourceLanguage, targetLanguage)" />
            </div>
            <div class="translate-output">{{ output }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { languageList } from './data'
import { translateText } from '@/api/translate';
import { debounce } from 'lodash-es'

const sourceLanguage = ref('en')
const targetLanguage = ref('zh')
const output = ref('')
const textInput = ref('')

const handleTranslating = async (query: string, sourceLanguage: string, targetLanguage: string) => {
    if (!query) {
        return;
    }
    const result = await translateText(query, sourceLanguage, targetLanguage)
    console.log(result);
    output.value = result['翻译结果']
}

const debounceHandleTranslating = (query: string, sourceLanguage: string, targetLanguage: string) => {
    return debounce(handleTranslating, 800)(query, sourceLanguage, targetLanguage)
}

</script>

<style scoped>
.translate-page {
    padding: 24px;
    width: 100%;
}

.translate-language {
    width: 300px;
    display: flex;
    align-items: center;
}

.translate-input-box {
    margin: 24px 0;
    display: flex;
}

.translate-input {
    width: 50%;
    height: 100%;
}

.translate-output {
    box-sizing: border-box;
    width: 50%;
    padding: 8px;
    background-color: rgb(72 81 164 / 4%);
}
</style>