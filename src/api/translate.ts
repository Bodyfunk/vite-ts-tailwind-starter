import request from '@/utils/request'
import { ElMessage } from 'element-plus'
import { fetchEventSource } from "@microsoft/fetch-event-source"

// 翻译
export function translateByMadlad(query: string, src: string, target: string) {
    const data = {
        text: query,
        src: src,
        dst: target
    }
    let url = '/api/my/fanyi'
    return request({
        url,
        method: 'post',
        data
    })
}

// 翻译
export function translateByNMT(query: string, src: string, target: string) {
    if (src === 'my' || target === 'my') {
        ElMessage.error('NMT模型不支持缅甸语')
        return
    }
    const data = {
        q: query,
        source: src,
        target: target,
        format: 'text'
    }
    let url = '/api/translate'
    return request({
        url,
        method: 'post',
        data
    })
}

export function ocrImg(file: any, ocr: 'ocr' | 'deepocr', format?: string) {
    const data = new FormData()
    console.log('File对象:', file);
    data.append('file', file, 'image.png')
    if ( ocr === 'deepocr' && format === 'true') {
        data.append('format', format)
    }
    if (ocr === 'ocr') {
        data.append('lang', 'chi_sim+eng')
    }
    
    let url = `/api/ocr/${ocr}`
    return request({
        url,
        method: 'post',
        headers: {
            'Content-Type':'multipart/form-data'
        },
        data
    })
}

export function fetchAudio(file: any) {
    const data = new FormData()
    console.log('File对象:', file);
    data.append('file', file, 'video.wav')  
    let url = `/api/ocr/transcribe`
    return request({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data
    })
}

export async function fetchStream(file: any, callBack: (chunk: string, done?: boolean) => void) {
    let vttStr = ''
    const data = new FormData()
    console.log('File对象:', file);
    data.append('file', file, 'video.wav')  
    const response = await fetch('/api/ocr/transcribe', {
        method: 'POST',       
        body: data,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    if (!response.body) { 
        throw new Error('Response body is null');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            console.log('Stream complete');
            callBack(vttStr,true)
            break;
        }

        const chunk = decoder.decode(value, { stream: true });
        console.log('Received chunk:', chunk);
        vttStr += chunk;
        // 处理chunk
        callBack(vttStr)
    }
}