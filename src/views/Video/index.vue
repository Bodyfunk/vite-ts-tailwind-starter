<template>
    <div class="video-page">
        <go-home></go-home>
        <div class="video-container">
            <div class="upload-container">
                <el-upload ref="uploadRef" class="upload" v-model:file-list="fileList" action="" :auto-upload="false"
                    :drag="true" accept="video/*" :onchange="() => { }" :limit="1">
                    <template #trigger>
                        <el-button type="primary">选择视频文件</el-button>
                    </template>
                </el-upload>
            </div>
            <div class="video-box">
                <div class="video-player-container" v-if="videoSrc">
                    <video-player id="CustomVideoPlayer" class="video-player vjs-theme-forest" crossorigin="anonymous"
                        playsinline controls :sources="videoSource.sources" :tracks="videoTracks" :height="320"
                        :volume="0.4" :children="[
                            // custom Video.js children component
                            // https://videojs.com/guides/options/#children
                            'mediaLoader',
                            'posterImage',
                            'bigPlayButton',
                            'loadingSpinner',
                            'controlBar',
                            'textTrackDisplay'
                        ]" :control-bar="{
                            // custom Video.js control bar component
                            // https://videojs.com/guides/options/#componentname
                            volumePanel: false
                        }" />
                </div>
                <div class="video-tracks-container" v-if="videoSrc" v-loading="!videoTracksText">
                    <!-- <el-scrollbar> -->
                    {{ videoTracksText }}
                    <!-- </el-scrollbar> -->
                </div>
            </div>
            <div id="result" class="result"></div>
            <div id="mp3result" class="result"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import GoHome from '@/components/GoHome.vue';
import { VideoPlayer } from '@videojs-player/vue'
import { UploadFile } from 'element-plus';
import 'video.js/dist/video-js.css'
import { ref, watch } from 'vue';
import { fetchAudio, fetchStream } from '@/api/translate';
import { bufferToMp3, bufferToWave } from '@/utils/ruoyi';

const fileList = ref<UploadFile[]>([])
const videoSrc = ref('')
const videoTracks = ref<any[]>([])
const videoTracksText = ref('')

watch(fileList, (newVal, oldVal) => {
    if (newVal.length > 0) {
        const file = newVal[0]
        if (!file.raw) return
        console.log(file);

        const videoUrl = URL.createObjectURL(file.raw)
        videoSource.sources[0].src = videoUrl
        videoSource.sources[0].type = file.raw.type
        videoSrc.value = videoUrl
        fileToAudio(file.raw)
    }
})

const videoSource = {
    sources: [
        {
            src: '',
            type: 'video/mp4'
        }
    ],
}

const fileToAudio = (file: File) => {
    // 开始识别
    const reader = new FileReader();
    reader.onload = function (event) {
        const arrBuffer = event.target.result;
        // 创建音频上下文
        const audioCtx = new AudioContext();
        // arrayBuffer转audioBuffer
        audioCtx.decodeAudioData(arrBuffer, function (audioBuffer) {
            const blob = bufferToWave(audioBuffer, audioBuffer.sampleRate * audioBuffer.duration);

            fetchStream(blob, (res, done) => {
                videoTracksText.value = res
                if (done) {

                    const blob = new Blob([res], { type: 'text/vtt' })
                    videoTracks.value = [
                        {
                            src: URL.createObjectURL(blob),
                            kind: 'captions',
                            srclang: '',
                            label: 'captions'
                        }
                    ] as Array<any>
                }
            })

            // fetchAudio(blob).then(res => {
            //     console.log(res)
            //     videoTracksText.value = res
            //     const blob = new Blob([res], { type: 'text/vtt' })
            //     videoTracks.value = [
            //         {
            //             src: URL.createObjectURL(blob),
            //             kind: 'captions',
            //             srclang: 'zh',
            //             label: '中文'
            //         }
            //     ] as Array<any>
            // })

            // const blobUrl = URL.createObjectURL(blob)
            // result.innerHTML = `<h4>wav格式音频试听</h4>
            // <audio src="${blobUrl}" controls></audio>
            // <p>点击<a href="${blobUrl}" download="${file.name}.wav">这里下载wav格式音频</a>。</p>
            // `;
            // const mp3blob = bufferToMp3(audioBuffer)
            // const mp3Url = URL.createObjectURL(mp3blob)
            // mp3result.innerHTML = `<h4>MP3格式音频试听</h4>
            //     <audio src="${mp3Url}" controls></audio>
            //     <p>点击<a href="${mp3Url}" download="${file.name}.mp3">这里下载mp3格式音频</a>。</p>
            // `;
        })
    };

    reader.readAsArrayBuffer(file);
}

</script>

<style scoped>
.video-page {
    padding: 24px;
    width: 100%;
}

.video-box {
    display: flex;
}

.video-player-container {
    flex: 1;
}

.video-player {
    width: 100%;
    height: 100%;
    border-radius: 12px;
}

.video-tracks-container {
    margin-left: 12px;
    padding: 12px;
    border-radius: 12px;
    background-color: #fff;
    width: 20vw;
    height: 30vh;
    font-size: 14px;
    color: #666;
    white-space: pre-line;
    overflow: auto;
}
</style>