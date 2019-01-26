class SocialHelper {

    static socials = [
        {
            key:'website',
            iconClass: 'icon-website'
        },
        {
            key:'twitter',
            iconClass: 'icon-twitter'
        },
        {
            key:'youtube',
            iconClass: 'icon-youtube'
        },
        {
            key:'vk',
            iconClass: 'icon-vkontakte'
        },
        {
            key:'twitch',
            iconClass: 'icon-twitch'
        },
        {
            key:'telegram',
            iconClass: 'icon-telegram'
        },
    ]

    static getSocialIconClass(socialKey) {

        const social = SocialHelper.socials.filter(item => item.key === socialKey)

        if(social.length) {
            return social[0].iconClass
        }

        return 'icon-marquee'
    }

    static getValidLink(link) {

        if(!/^https?\:\/\//.test(link))
            link = `http://${link}`

        return link
    }
}

export default SocialHelper