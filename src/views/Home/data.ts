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
        name: '翻译',
        description: '多语种翻译，结合AI大模型，翻译更流畅。',
        router: '/translate',
        icon: 'Switch',
    },
    {
        name: '翻译',
        description: '输入需要翻译的文本',
        router: '/translate',
        icon: 'Switch',
    },
    {
        name: '翻译',
        description: '输入需要翻译的文本',
        router: '/translate',
        icon: 'Switch',
    },
    {
        name: '翻译',
        description: '输入需要翻译的文本',
        router: '/translate',
        icon: 'Switch',
    }
]