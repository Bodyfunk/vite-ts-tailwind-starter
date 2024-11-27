import { Component } from "vue";

export interface IToolInfo{
    name: string;
    description: string;
    router: string;
    icon?: string;
    iconComp?: Component;
}

export const tools: IToolInfo[] = [
    {
        name: '离线翻译',
        description: '输入需要翻译的文字内容，多语种翻译，结合AI大模型，翻译更流畅。',
        router: '/translate',
        icon: 'ChatDotSquare',
    },
    {
        name: 'OCR文字识别',
        description: '通过图片识别文字，提取图片文字，支持jpg、png、jpeg、gif格式。',
        router: '/ocr',
        icon: 'View',
    },
    {
        name: '视频解析',
        description: '上传视频文件，生成字幕，支持mp4、avi、mkv、wmv等格式。',
        router: '/video',
        icon: 'VideoPlay',
    },
    {
        name: 'PDF分割',
        description: '上传pdf文件，将pdf文件按页分割成多个页面，并生成图片。',
        router: '/pdf',
        icon: 'Document',
    }
]