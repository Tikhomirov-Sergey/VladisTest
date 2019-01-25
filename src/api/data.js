export const userData = {
    users: [
        {
            email: 'max@test.com',
            password: '12345',
            accessToken: '567830a0-ce96-4c10-863f-ffda868bcbf2',
            answer: {
                status: 'ok',
                data: {
                    id: 1,
                    accessToken: '567830a0-ce96-4c10-863f-ffda868bcbf2',
                }
            }
        },
        {
            email: '1@1',
            password: '1',
            accessToken: '567830a0-ce96-4c10-863f-ffda868bcbf3',
            answer: {
                status: 'ok',
                data: {
                    id: 2,
                    accessToken: '567830a0-ce96-4c10-863f-ffda868bcbf3',
                }
            }
        }
    ],
    error: {
        status: "err",
        message: "Неверный логин или пароль"
    }
}

export const newsData = {
    answer: {
        "status": "ok",
        "data": [
            {
                "id": 1,
                "title": "Не слишком ли быстро мы переходим на беспилотные автомобили",
                "text": "Автопроизводители и высокотехнологичные компании, тратящие миллиарды долларов на развитие беспилотных автомобилей и грузовиков, вовсю рекламируют автоматический транспорт, который, по их мнению, будет безопаснее, чище и сделает общество более мобильным."
            },
            {
                "id": 2,
                "title": "Интеллектуальная собственность: где заканчивается цитирование и начинается плагиат",
                "text": "Компьютерная программа или роман — это в первую очередь идея, творческий замысел. Но человек, купивший книгу, хоть и стал собственником её обложки и страниц, не может присвоить себе то, что написал или нарисовал автор, и продавать романы под своим именем. Иными словами, интеллектуальная собственность — это придуманный и созданный человеком результат. И одновременно с этим — права на него."
            }
        ]
    }
}

export const profileData = [
    {
        userId: '1',
        answer: {
            "status": "ok",
            "data": {
                "userId": '1',
                "email": 'max@test.com',
                "city": "Москва",
                "languages": [
                    "English",
                    "Русский"
                ],
                "social": [
                    {
                        "label": "vk",
                        "link": "vk.com/maxpfrontend"
                    },
                    {
                        "label": "telegram",
                        "link": "t.me/maxpfrontend"
                    },
                    {
                        "label": "web",
                        "link": "https://maxpfrontend.ru"
                    },
                    {
                        "label": "youtube",
                        "link": "https://www.youtube.com/channel/UCqJyAVWwIqPWKEkfCSP1y4Q"
                    },
                    {
                        "label": "twitter",
                        "link": "https://twitter.com/MaxPatsiansky"
                    },
                    {
                        "label": "twitch",
                        "link": "http://twich.tv/maxpfrontend"
                    }
                ]
            }
        }
    }
]