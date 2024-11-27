<template>
    <div class="OCR-page">
        <go-home></go-home>
        <div class="OCR-content">
            <div>
                <h2>第一步：上传图片</h2>
                <el-upload ref="uploadRef" class="upload" v-model:file-list="fileList" action="" :auto-upload="false"
                    :drag="true" accept=".jpg,.jpeg,.png,.gif" :before-upload="beforeUpload" :onchange="onchange"
                    :limit="1" :on-success="onSuccess" :on-exceed="handleExceed">
                    <template #trigger>
                        <el-button type="primary">选择图片</el-button>
                    </template>

                    <template #tip>
                        <div class="el-upload__tip">
                            支持上传jpg、jpeg、png、gif格式的文件
                        </div>
                    </template>
                </el-upload>
            </div>
            <div>
                <h2>第二步：图片预处理（可选,可叠加）</h2>
                <div v-for="(item, index) in preProcessMethodsList" :key="index">
                    <div class="pre-process">
                        <h3>{{ index + 1 }}:</h3>
                        <div>
                            <div>
                                预处理方式：
                                <el-cascader v-model="item.method" :options="preProcessMethodsConfig"
                                    @change="handlePreprocess(item.method, index)" />
                            </div>
                            <div v-if="item.method.length > 0" class="params-container">
                                参数调整：
                                <div v-for="param in Object.keys(item.params)" class="params-item">
                                    <div v-if="param === 'kernel'">
                                        {{ param }}:
                                        <el-input v-model.number="item.params[param][0]" size="small"
                                            style="width: 50px" />
                                        ，
                                        <el-input v-model.number="item.params[param][1]" size="small"
                                            style="width: 50px" />
                                    </div>
                                    <div v-else>
                                        {{ param }}:
                                        <el-input v-model.number="item.params[param]" size="small"
                                            style="width: 50px" />
                                    </div>
                                </div>
                                <div class="params-item">
                                    <el-button type="primary" @click="startPreprocess(item, index)"
                                        size="small">确定参数</el-button>
                                </div>
                            </div>
                        </div>

                        <div style="margin: 12px 0; color: #666;">{{ translatePreProcessMethodTips(item.method) }}
                        </div>
                    </div>
                    <div>
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <canvas :id="`canvasInput_${index}`"></canvas>
                                    </td>
                                    <td>
                                        <canvas :id="`canvasOutput_${index}`"></canvas>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <el-button v-show="preProcessMethodsList.at(-1)?.done" class="ml-3" type="primary"
                @click="addPreProcessMethod(preProcessMethodsList.length)">添加
                +</el-button>

            <div>
                <h2>第三步：选择参数</h2>
                <div class="select-params">
                    <div class="select-model">
                        使用预处理图片：
                        <el-switch v-model="usePre" @click="handleUsePre" />
                    </div>
                    <div class="select-model">
                        选择OCR模型：
                        <el-select v-model="modelType" placeholder="Select" style="width: 120px">
                            <el-option label="OCR" value="ocr" />
                            <el-option label="DeepOCR" value="deepocr" />
                        </el-select>
                    </div>
                    <div class="select-model" v-show="modelType === 'deepocr'">
                        格式化输出：
                        <el-switch v-model="formatOutput" />
                    </div>
                </div>
            </div>
            <div class="start-btn">
                <el-button class="ml-3" type="success" @click="submitUpload" :loading="loading">
                    开始识别
                </el-button>
                <el-button v-show="usePre" class="ml-3" type="primary" @click="saveCanvasImage('canvasOutput')">
                    保存图片
                </el-button>
            </div>
            <div>
                <h2>第四步：识别结果</h2>
                <div class="result-page">
                    <iframe :srcdoc="ocrResult" frameborder="0" @load="resizeIframe"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import GoHome from '@/components/GoHome.vue';
import { preProcessMethods, IPreProcessParams, preProcessMethodsConfig, preProcessMethodTips, preProcessParams } from './data.ts';
import { nextTick, ref } from 'vue'
import { ElMessage, genFileId, UploadProps, UploadRawFile, type UploadFile, type UploadInstance, type UploadRequestOptions, type UploadUserFile } from 'element-plus'
import { ocrImg } from '@/api/translate.ts';

const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])
const usePre = ref(false)
const modelType = ref<'ocr' | 'deepocr'>('deepocr')
const formatOutput = ref(true)
const ocrResult = ref('')
const loading = ref(false)
// 预处理环节数组
const preProcessMethodsList = ref<IPreProcessParams[]>([
    {
        method: [],
    }
])

const handlePreprocess = (value: string[], index: number) => {
    console.log('handlePreprocess', value);
    preProcessMethodsList.value[index].method = value
    preProcessMethodsList.value[index].params = preProcessParams[value.at(-1) ?? 'gaussianBlur']
    usePre.value = true
}

// 添加预处理环节
const addPreProcessMethod = (index: number) => {
    preProcessMethodsList.value.push({
        method: [],
    })
    nextTick(() => {
        const prevCanvas = document.getElementById(`canvasOutput_${index - 1}`) as HTMLCanvasElement
        if (prevCanvas) {
            prevCanvas.toBlob((blob) => {
                // 将上一步预处理的结果绘制在画布上
                blob && drawImage(`canvasInput_${index}`, `canvasOutput_${index}`, blob)
            })
        }
    })
}

// 开始预处理
const startPreprocess = (value: IPreProcessParams, index: number) => {
    const cvFn = value.method.at(-1) ?? 'gaussianBlur'
    preProcessMethods[cvFn](`canvasInput_${index}`, `canvasOutput_${index}`, value.params)
    preProcessMethodsList.value[index].done = true

    // 向后面环节依次更新
    const nextProcess = preProcessMethodsList.value.at(index + 1)
    if (nextProcess && nextProcess.done) {
        const prevCanvas = document.getElementById(`canvasOutput_${index}`) as HTMLCanvasElement
        if (prevCanvas) {
            prevCanvas.toBlob((blob) => {
                // 将上一步预处理的结果绘制在下一步的输入画布上
                blob && drawImage(`canvasInput_${index + 1}`, `canvasOutput_${index + 1}`, blob)
                setTimeout(() => {
                    startPreprocess(preProcessMethodsList.value[index + 1], index + 1)
                }, 800);
            })
        }
    }
    return
}

const submitUpload = () => {
    console.log('shang');
    if (fileList.value.length === 0) {
        ElMessage.error('请上传图片')
        return
    }
    handleOCR(fileList.value[0])
}

const beforeUpload = (file: UploadFile) => {

}

const onSuccess = (file: UploadFile, response: any) => {
    console.log('beforeSuccess', file, response);
    fileList.value = []
}

const handleExceed: UploadProps['onExceed'] = (files) => {
    console.log('超出啦');

    uploadRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    uploadRef.value!.handleStart(file)
    onchange({
        target: {
            files: [file]
        }
    })
}

const handleUsePre = (value: boolean) => {

}

// 上传组件文件变化事件
const onchange = (file: Event) => {
    console.log('change', file);
    usePre.value = false
    const target = file.target as HTMLInputElement;
    if (!target || !target.files) {
        return
    }
    const targetFile = target.files[0];
    if (targetFile) {
        drawImage('canvasInput_0', 'canvasOutput_0', targetFile)
    }
}

// 向目标canvas中绘制图片
const drawImage = (canvasInputId: string, canvasOutputId: string, targetFile: File | Blob) => {
    const reader = new FileReader();
    reader.onload = function (e) {
        if (!e?.target?.result) {
            return
        }
        const img = new Image();
        img.src = e?.target?.result as string; // 设置图像源为文件内容

        img.onload = function () {
            const canvasInput = document.getElementById(canvasInputId) as HTMLCanvasElement
            const canvasOutput = document.getElementById(canvasOutputId) as HTMLCanvasElement
            const ctxInput = canvasInput.getContext('2d')!
            // 获取图像的原始宽度和高度
            const originalWidth = img.width;
            const originalHeight = img.height;

            // 定义 canvas 的宽度
            const canvasWidth = canvasInput.offsetWidth;
            canvasInput.width = canvasWidth;
            canvasOutput.width = canvasWidth;

            // 计算保持原始比例后的高度
            const aspectRatio = originalWidth / originalHeight;
            const canvasHeight = canvasWidth / aspectRatio;

            // 设置 canvas 的高度
            canvasInput.height = canvasHeight;
            canvasOutput.height = canvasHeight;

            // 清空 canvas 并按比例绘制图像
            ctxInput.clearRect(0, 0, canvasInput.width, canvasInput.height);
            ctxInput.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        };
    };
    // 开始读取文件
    reader.readAsDataURL(targetFile);
}

const saveCanvasImage = (canvasId: string) => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas) {
        // 将 canvas 转换为数据 URL
        const dataURL = canvas.toDataURL('image/png');

        // 创建下载链接
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas-image.png'; // 指定下载的文件名

        // 触发下载
        link.click();
    } else {
        console.error('Canvas not found!');
    }
}

const handleOCR = async (file: UploadUserFile) => {
    loading.value = true;
    if (usePre.value) {
        canvas2fileForUpload(modelType.value, formatOutput.value.toString());
    } else {
        const blob = new Blob([file.raw as File])
        const res = await ocrImg(blob, modelType.value, formatOutput.value.toString());
        ocrResult.value = res;
        loading.value = false;
    }

}

const canvas2fileForUpload = (ocr: 'ocr' | 'deepocr', format: string) => {
    const lastIndex = preProcessMethodsList.value.at(-1)?.done ? preProcessMethodsList.value.length - 1 : preProcessMethodsList.value.length - 2
    if (lastIndex < 0) {
        ElMessage.error('请至少添加一个预处理环节,并完成预处理')
        return
    }
    const canvas = document.getElementById(`canvasOutput_${lastIndex}`) as HTMLCanvasElement;
    // 使用 toBlob 方法将 canvas 导出为 Blob 对象
    canvas.toBlob(async (blob) => {
        if (blob) {
            // 创建 File 对象
            const file = new File([blob], 'canvasImage.png', { type: 'image/png' });
            // 上传逻辑
            const res = await ocrImg(file, ocr, format);
            ocrResult.value = res;
            loading.value = false;
        }
    }, 'image/png'); // 指定所需的图片格式

}

// 动态调整 iframe 高度
const resizeIframe = () => {
    const iframe = document.querySelector('iframe') as HTMLIFrameElement;
    if (iframe) {
        console.log(iframe.contentWindow?.document.body.scrollHeight);

        iframe.style.height = `${(iframe.contentWindow?.document.body.scrollHeight ?? 0) + 100}px`;
    }
}

const translatePreProcessMethodTips = (methods: string[]) => {
    const method = methods.at(-1) ?? ''
    if (preProcessMethodTips[method]) {
        return preProcessMethodTips[method]
    }
    return ''
}


</script>

<style scoped>
.OCR-page {
    padding: 24px;
    width: 100%;
}

.start-btn {
    display: flex;
    align-items: center;
    justify-content: center;
}

.pre-process {
    margin: 24px 0;
}

.select-params {
    margin: 24px 0;
    display: flex;
    align-items: center;
}

.select-model {
    margin-left: 16px;
    display: flex;
    align-items: center;
}

canvas {
    border: 1px solid #ccc;
    width: 100%;
}

iframe {
    width: 100%;
    height: 30vh;
    border: none;
}

.params-container {
    margin: 6px 12px;
    width: 100%;
    display: flex;
    align-items: center;
}

.params-item {
    margin-right: 12px;
}
</style>