export const chatMsg_translate = (text: string) => {
    return [
        {
            role: 'user',
            content: '将下面一句话翻译成英文'
        },
        {
            role: 'user',
            content: text
        }
    ]
}

export const chatMsg_articles = (articles: string[], title: string) => {
    const messages = [
        {
            role: 'system',
            content: 'You are a writer, and I will provide some reference articles below'
        }
    ]

    for (let i = 0; i < articles.length; i++) {
        messages.push({
            role: 'user',
            content: `${i + 1} ${articles[i]}`
        })
    }

    messages.push({
        role: 'user',
        content: `Using the above article as a reference, write a Chinese article with ${title} as the title and output it in markdown format.`
    })

    return messages
}

export const chatMsg_title = (title: string) => {
    return [
        {
            role: 'system',
            content: 'You are a researcher'
        },
        {
            role: 'user',
            content: `Write a Chinese article with ${title} as the title, and output in markdown format.`
        }
    ]

}