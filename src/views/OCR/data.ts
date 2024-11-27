import { gaussianBlur, morphGradient, open, close, dilate, erode, topHat, blackHat } from '@/utils/openCV.js'
//预处理方法配置
export const preProcessMethodsConfig = [
    {
        label: '高斯滤波',
        value: 'gaussianBlur'
    },
    {
        label:'形态学变换',
        value: 'morphology',
        children: [
            {
                label: '开运算',
                value: 'open'
            },
            {
                label: '闭运算',
                value: 'close'
            },
            {
                label: '膨胀运算',
                value: 'dilate'
            },
            {
                label: '腐蚀运算',
                value: 'erode'
            },
            {
                label: '顶帽运算',
                value: 'topHat'
            },
            {
                label: '黑帽运算',
                value: 'blackHat'
            },
            {
                label: '梯度运算',
                value: 'gradient'
            }
        ]
    }
]

export const preProcessMethodTips:{[key:string]:string} = {
    gaussianBlur: '对图像进行高斯滤波，去除噪。kernel参数为卷积核大小，取值为奇数；sigmaX和sigmaY参数为高斯函数的标准差。',
    morphology: '对图像进行形态学变换，提取图像中的特征。kernel参数为卷积核大小',
    open: '开运算，先腐蚀后膨胀，去除小物体,有利于消除噪声。kernel参数为卷积核大小',
    close: '闭运算，先膨胀后腐蚀，有利于填充内部的小孔或小黑点。kernel参数为卷积核大小',
    dilate: '膨胀运算，扩大物体的边界,有利于连接两个对象。kernel参数为卷积核大小',
    erode: '腐蚀运算，缩小物体的边界,利于分离两个相连的对象。kernel参数为卷积核大小',
    topHat: '顶帽运算，提取图像的前景。kernel参数为卷积核大小',
    blackHat: '黑帽运算，提取图像的背景。kernel参数为卷积核大小',
    gradient: '梯度运算，提取图像的边缘。kernel参数为卷积核大小'
}

export const preProcessMethods: { [key: string]: Function } = {
    gaussianBlur,
    open,
    close,
    dilate,
    erode,
    topHat,
    blackHat,
    gradient:morphGradient
}

export interface IPreProcessParams { 
    method: string[],
    srcUrl?: string,
    dstUrl?: string,
    params?: typeof preProcessParams[TPreProcessMethod]
    done?:boolean
}

export const preProcessParams: { [key: string]: any } = {
    'gaussianBlur': {
        kernel: [3, 3],
        sigmaX: 0,
        sigmaY: 0
    },
    'erode': {
        kernel: [3, 3],
    },
    'dilate': {
        kernel: [5, 5],
    },
    'open': {
        kernel: [5, 5],
    },
    'close': {
        kernel: [5, 5],
    },
    'gradient': {
        kernel: [5, 5],
    },
    'topHat': {
        kernel: [9, 9],
    },
    'blackHat': {
        kernel: [53, 53],
    }
}

export type TPreProcessMethod = keyof typeof preProcessParams