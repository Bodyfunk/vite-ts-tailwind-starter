<template>
    <div class="translate-page">
        <go-home></go-home>

        <div class="translate-line">
            选择模型：
            <el-radio-group v-model="model" @change="handleChangeModel">
                <el-radio v-for="item in modelList" :value="item.value" :disabled="item.disable" size="large">{{
                    item.name }}</el-radio>
            </el-radio-group>
        </div>
        <div class="translate-box">
            <div class="translate-language">
                <el-select v-model="sourceLanguage" filterable placeholder="源语言">
                    <el-option v-for="item in supportedLanguageList[model]" :key="item.value" :label="item.name"
                        :value="item.value" />
                </el-select>
                <div>
                    <el-icon class="translate-switch" style="margin: 0 16px;">
                        <Switch />
                    </el-icon>
                </div>
                <el-select v-model="targetLanguage" filterable placeholder="目标语言">
                    <el-option v-for="item in supportedLanguageList[model]" :key="item.value" :label="item.name"
                        :value="item.value" />
                </el-select>
            </div>
            <div class="translate-input-box">
                <div class="translate-input">
                    <el-input v-model="textInput" :rows="20" style="width: 100%" resize="none" type="textarea"
                        placeholder="请输入文本" :input-style="{ 'font-size': '1.275em', lineHeight: '1.75em' }"
                        @input="handleInput" />
                </div>
                <div v-loading="loading" class="translate-output">{{ output }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { modelList, supportedLanguageList } from './data'
import { translateByNMT, translateByMadlad } from '@/api/translate';
import GoHome from '@/components/GoHome.vue';
import { debounce } from '@/utils/ruoyi';

const sourceLanguage = ref('auto')
const targetLanguage = ref('zh')
const output = ref('')
const textInput = ref('')
const model = ref('NMT')
const loading = ref(false)

const handleTranslating = async () => {
    console.log('gogo');

    if (!textInput.value) {
        return;
    }
    const queryText = textInput.value.replace(/\n/g, '')
    loading.value = true
    let result: any
    try {
        switch (model.value) {
            case 'madlad400-7b':
                result = await translateByMadlad(queryText, sourceLanguage.value, targetLanguage.value)
                break;
            case 'NMT':
            default:
                result = await translateByNMT(queryText, sourceLanguage.value, targetLanguage.value)
                break;
        }
        console.log(result);
        output.value = result.translatedText || result['翻译结果'] || ''
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false
    }
}

const handleInput = debounce(function () {
    handleTranslating()
}, 500);

const handleChangeModel = (value: string) => {
    switch (value) {
        case 'NMT':
            sourceLanguage.value = 'auto'
            targetLanguage.value = 'zh'
            break;
        case 'madlad400-7b':
            sourceLanguage.value = 'en'
            targetLanguage.value = 'zh'
            break;
        default:
            break;
    }
}
</script>

<style scoped>
.translate-page {
    padding: 24px;
    width: 100%;
}

::v-deep .translate-language {
    box-sizing: border-box;
    width: 100%;
    height: 3em;
    border: 1px solid #dcdfe6;
    border-bottom: none;
    display: flex;
    align-items: center;
    background-color: #fff;

    .el-select .el-select__wrapper {
        box-shadow: none;
    }
}

.translate-switch {
    width: 36px;
    height: 36px;
    font-size: 24px;
    border-radius: 6px;
    background-color: #dcdfe6;
}

.translate-input-box {
    border: 1px solid #dcdfe6;
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
    border: 1px solid #dcdfe6;
    background-color: #fff;
}

.translate-line {
    margin-top: 24px;
}

.translate-box {
    margin-top: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>