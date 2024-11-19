import { ref } from "vue";

export interface INewsItem {
    link: string;
    author: string;
    img: string;
    title: string;
    time: string;
    articleAbstract: string;
    topic?: string;
}

export const tabs = [
    {
        label: 'cbsnews',
        name: 'cbsnews.db'
    },
    {
        label: 'times',
        name: 'times.db'
    },
    {
        label: 'nature',
        name: 'nature.db'
    },
]

export const articles = ref<INewsItem[]>([]);

export const selectedTab = ref<string>('cbsnews.db');

export const inputQuery = ref('')