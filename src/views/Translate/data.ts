export const modelList = [
    // {
    //     name: "m2m100-1.2B",
    //     value: "m2m100-1.2B",
    //     disable: true
    // },
    // {
    //     name: "m2m100-12B",
    //     value: "m2m100-12B",
    //     disable: true
    // },
    {
        name: "madlad400-7b",
        value: "madlad400-7b",
        disable: false
    },
    // {
    //     name: "t5-en-ru-zh-large-v2",
    //     value: "t5-en-ru-zh-large-v2",
    //     disable: true
    // },
    {
        name: "transformers",
        value: "NMT",
        disable: false
    },
    {
        name: "chatGPT",
        value: "gpt",
        disable: false
    },
    // {
    //     name: "t5-en-ru-zh-small",
    //     value: "t5-en-ru-zh-small",
    //     disable: true
    // },
]

const mntLanguageList = [
    {name:'自动检测',value:'auto'},
    { name: '阿拉伯语', value: 'ar' },
    { name: '阿塞拜疆语', value: 'az' },
    { name: '保加利亚语', value: 'bg' },
    { name: '孟加拉语', value: 'bn' },
    { name: '加泰罗尼亚语', value: 'ca' },
    { name: '捷克语', value: 'cs' },
    { name: '丹麦语', value: 'da' },
    { name: '德语', value: 'de' },
    { name: '希腊语', value: 'el' },
    { name: '英语', value: 'en' },
    { name: '世界语', value: 'eo' },
    { name: '西班牙语', value: 'es' },
    { name: '爱沙尼亚语', value: 'et' },
    { name: '巴斯克语', value: 'eu' },
    { name: '波斯语', value: 'fa' },
    { name: '芬兰语', value: 'fi' },
    { name: '法语', value: 'fr' },
    { name: '爱尔兰语', value: 'ga' },
    { name: '加利西亚语', value: 'gl' },
    { name: '希伯来语', value: 'he' },
    { name: '印地语', value: 'hi' },
    { name: '匈牙利语', value: 'hu' },
    { name: '印度尼西亚语', value: 'id' },
    { name: '意大利语', value: 'it' },
    { name: '日语', value: 'ja' },
    { name: '韩语', value: 'ko' },
    { name: '立陶宛语', value: 'lt' },
    { name: '拉脱维亚语', value: 'lv' },
    { name: '马来语', value: 'ms' },
    { name: '挪威语（Bokmål）', value: 'nb' },
    { name: '荷兰语', value: 'nl' },
    { name: '波兰语', value: 'pl' },
    { name: '葡萄牙语', value: 'pt' },
    { name: '罗马尼亚语', value: 'ro' },
    { name: '俄语', value: 'ru' },
    { name: '斯洛伐克语', value: 'sk' },
    { name: '斯洛文尼亚语', value: 'sl' },
    { name: '阿尔巴尼亚语', value: 'sq' },
    { name: '瑞典语', value: 'sv' },
    { name: '泰语', value: 'th' },
    { name: '他加禄语', value: 'tl' },
    { name: '土耳其语', value: 'tr' },
    { name: '乌克兰语', value: 'uk' },
    { name: '乌尔都语', value: 'ur' },
    { name: '中文', value: 'zh' },
    { name: '繁体中文', value: 'zt' }
]

const m2LanguageList = [
  { name: '南非语', value: 'af' },
  { name: '阿姆哈拉语', value: 'am' },
  { name: '阿拉伯语', value: 'ar' },
  { name: '阿斯图里亚斯语', value: 'ast' },
  { name: '阿塞拜疆语', value: 'az' },
  { name: '巴什基尔语', value: 'ba' },
  { name: '白俄罗斯语', value: 'be' },
  { name: '保加利亚语', value: 'bg' },
  { name: '孟加拉语', value: 'bn' },
  { name: '布列塔尼语', value: 'br' },
  { name: '波斯尼亚语', value: 'bs' },
  { name: '加泰罗尼亚语', value: 'ca' },
  { name: '宿务语', value: 'ceb' },
  { name: '捷克语', value: 'cs' },
  { name: '威尔士语', value: 'cy' },
  { name: '丹麦语', value: 'da' },
  { name: '德语', value: 'de' },
  { name: '希腊语', value: 'el' },
  { name: '英语', value: 'en' },
  { name: '西班牙语', value: 'es' },
  { name: '爱沙尼亚语', value: 'et' },
  { name: '波斯语', value: 'fa' },
  { name: '富拉语', value: 'ff' },
  { name: '芬兰语', value: 'fi' },
  { name: '法语', value: 'fr' },
  { name: '西弗里西亚语', value: 'fy' },
  { name: '爱尔兰语', value: 'ga' },
  { name: '苏格兰盖尔语', value: 'gd' },
  { name: '加利西亚语', value: 'gl' },
  { name: '古吉拉特语', value: 'gu' },
  { name: '豪萨语', value: 'ha' },
  { name: '希伯来语', value: 'he' },
  { name: '印地语', value: 'hi' },
  { name: '克罗地亚语', value: 'hr' },
  { name: '海地克里奥尔语', value: 'ht' },
  { name: '匈牙利语', value: 'hu' },
  { name: '亚美尼亚语', value: 'hy' },
  { name: '印度尼西亚语', value: 'id' },
  { name: '伊博语', value: 'ig' },
  { name: '伊洛卡诺语', value: 'ilo' },
  { name: '冰岛语', value: 'is' },
  { name: '意大利语', value: 'it' },
  { name: '日语', value: 'ja' },
  { name: '爪哇语', value: 'jv' },
  { name: '格鲁吉亚语', value: 'ka' },
  { name: '哈萨克语', value: 'kk' },
  { name: '高棉语', value: 'km' },
  { name: '卡纳达语', value: 'kn' },
  { name: '韩语', value: 'ko' },
  { name: '卢森堡语', value: 'lb' },
  { name: '卢干达语', value: 'lg' },
  { name: '林加拉语', value: 'ln' },
  { name: '老挝语', value: 'lo' },
  { name: '立陶宛语', value: 'lt' },
  { name: '拉脱维亚语', value: 'lv' },
  { name: '马尔加什语', value: 'mg' },
  { name: '马其顿语', value: 'mk' },
  { name: '马拉雅拉姆语', value: 'ml' },
  { name: '蒙古语', value: 'mn' },
  { name: '马拉地语', value: 'mr' },
  { name: '马来语', value: 'ms' },
  { name: '缅甸语', value: 'my' },
  { name: '尼泊尔语', value: 'ne' },
  { name: '荷兰语', value: 'nl' },
  { name: '挪威语', value: 'no' },
  { name: '北索托语', value: 'ns' },
  { name: '奥克语', value: 'oc' },
  { name: '奥里亚语', value: 'or' },
  { name: '旁遮普语', value: 'pa' },
  { name: '波兰语', value: 'pl' },
  { name: '普什图语', value: 'ps' },
  { name: '葡萄牙语', value: 'pt' },
  { name: '罗马尼亚语', value: 'ro' },
  { name: '俄语', value: 'ru' },
  { name: '信德语', value: 'sd' },
  { name: '僧伽罗语', value: 'si' },
  { name: '斯洛伐克语', value: 'sk' },
  { name: '斯洛文尼亚语', value: 'sl' },
  { name: '索马里语', value: 'so' },
  { name: '阿尔巴尼亚语', value: 'sq' },
  { name: '塞尔维亚语', value: 'sr' },
  { name: '斯瓦蒂语', value: 'ss' },
  { name: '巽他语', value: 'su' },
  { name: '瑞典语', value: 'sv' },
  { name: '斯瓦希里语', value: 'sw' },
  { name: '泰米尔语', value: 'ta' },
  { name: '泰语', value: 'th' },
  { name: '他加禄语', value: 'tl' },
  { name: '茨瓦纳语', value: 'tn' },
  { name: '土耳其语', value: 'tr' },
  { name: '乌克兰语', value: 'uk' },
  { name: '乌尔都语', value: 'ur' },
  { name: '乌兹别克语', value: 'uz' },
  { name: '越南语', value: 'vi' },
  { name: '沃洛夫语', value: 'wo' },
  { name: '科萨语', value: 'xh' },
  { name: '意第绪语', value: 'yi' },
  { name: '约鲁巴语', value: 'yo' },
  { name: '中文', value: 'zh' },
  { name: '祖鲁语', value: 'zu' }
]

const gptLanguageList = [{
    name: '中文',
    value: 'zh'
}, {
    name: '英语',
    value: 'en'
}]


export const supportedLanguageList:{[key:string]:{name:string,value:string}[]} = {
    'madlad400-7b': m2LanguageList,
    'NMT': mntLanguageList,
    'gpt': gptLanguageList
}