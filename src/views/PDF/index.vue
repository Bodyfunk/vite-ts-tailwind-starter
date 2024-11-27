<template>
    <div class="pdf-page">
        <go-home></go-home>
        <div>
            <div class="line">
                <h2>上传PDF</h2>
                <el-upload ref="uploadRef" v-model:file-list="pdfFIle" class="upload" action="" :auto-upload="false"
                    :drag="true" accept=".pdf" :onchange="onFileChange" :limit="1" :on-exceed="handleExceed">
                    <template #trigger>
                        <el-button type="primary">选择PDF</el-button>
                    </template>
                </el-upload>
            </div>
            <div class="line">
                <el-button type="primary" @click="handleSplitPdf">分割 PDF</el-button>
            </div>
            <div class="line">
                <h2>分割结果:</h2>
                <div v-show="pdfImgs.length > 0" class="line" style="text-align: right;">
                    <el-button type="primary" @click="handleDownloadAll">下载全部</el-button>
                </div>
                <div class="image-container">
                    <div v-for="(imgSrc, index) in pdfImgs" :key="index" class="image-item">
                        <el-image :src="imgSrc" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                            :preview-src-list="pdfImgs" :initial-index="index" fit="cover">
                        </el-image>

                        <el-button type="primary" @click="handleDownload(imgSrc, index)">下载</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import GoHome from '@/components/GoHome.vue';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { base64ToBlob } from '@/utils/ruoyi';
import { genFileId, UploadFile, UploadProps, UploadRawFile } from 'element-plus';

const pdfFIle = ref<UploadFile[]>([]); // 存储用户选择的 PDF 文件
const pdfImgs = ref<string[]>([]); // 存储 PDF 文件的图片对象
const uploadRef = ref<any>(); // 上传组件的 ref

const onFileChange = (event: any) => {
    pdfImgs.value = [];
};

const handleExceed: UploadProps['onExceed'] = (files) => {
    console.log('超出啦');

    uploadRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    uploadRef.value!.handleStart(file)
    onFileChange({
        target: {
            files: [file]
        }
    })
}

const handleSplitPdf = async () => {
    console.log(pdfFIle.value);
    if (pdfFIle.value.length === 0) {
        alert('请选择PDF文件。');
        return;
    }
    const file = pdfFIle.value[0];

    if (file && file?.raw?.type === 'application/pdf') {
        const fileReader = new FileReader();
        fileReader.onload = async function () {
            if (!(this.result instanceof ArrayBuffer)) return;
            // 创建一个 canvas 元素
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            const typedarray = new Uint8Array(this.result);
            const pdf = await pdfjsLib.getDocument(typedarray).promise;
            const pageCount = pdf.numPages; // 读取页数
            for (let i = 1; i <= pageCount; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2 }); // 设置缩放比例
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                if (!context) {
                    return;
                }
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                await page.render(renderContext).promise;
                // 将 canvas 转换为图像
                pdfImgs.value.push(canvas.toDataURL("image/png"));
            }
        };
        fileReader.readAsArrayBuffer(file.raw);
    } else {
        alert('请选择有效的PDF文件。');
    }
}

const handleDownload = (imgSrc: string, index: number) => {
    const a = document.createElement("a");
    a.href = imgSrc;
    a.download = `page${index + 1}.png`;
    a.click();

}

const handleDownloadAll = () => {
    const zip = new JSZip();
    for (let i = 0; i < pdfImgs.value.length; i++) {
        const imgname = `page${i + 1}.png`;
        zip.file(imgname, base64ToBlob(pdfImgs.value[i], "image/png"));
    }

    zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, "split_pdf.zip");
    });
}
</script>

<style scoped>
.pdf-page {
    padding: 24px;
    width: 100%;
}

.line {
    margin: 24px 0;
}

.image-container {
    display: flex;
    flex-wrap: wrap;
}

.image-item {
    width: 23%;
    height: auto;
    margin: 1%;

    display: flex;
    flex-direction: column;
    align-items: center;

    button {
        margin-top: 12px;
    }
}
</style>
