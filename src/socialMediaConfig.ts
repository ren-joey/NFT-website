export type socialIconName = 'twitter'|'opensea'|'discord';

export interface ISocialList {
    iconName: socialIconName,
    title: string,
    href: string,
    visible: boolean
}

export const socialList: ISocialList[] = [
    {
        iconName: 'opensea',
        title: 'OPENSEA',
        href: 'https://opensea.io/VBC-labs',
        visible: false
    },
    {
        iconName: 'discord',
        title: 'DISCORD',
        href: 'https://discord.gg/25kGtf3juU',
        visible: true
    },
    {
        iconName: 'twitter',
        title: 'TWITTER',
        href: 'https://twitter.com/marketing_vbc',
        visible: true
    }
];
