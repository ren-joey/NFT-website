import { SocialIconName } from "../@types/basicVariable";

export interface ISocialList {
    iconName: SocialIconName,
    title: string,
    href: string,
    visible: boolean
}

export const socialList: ISocialList[] = [
    {
        iconName: 'opensea',
        title: 'OPENSEA',
        href: 'https://opensea.io/collection/vbc-betamon',
        visible: true
    },
    {
        iconName: 'discord',
        title: 'DISCORD',
        href: 'https://discord.gg/vbc-labs',
        visible: true
    },
    {
        iconName: 'twitter',
        title: 'TWITTER',
        href: 'https://twitter.com/VBC_labs',
        visible: true
    },
    {
        iconName: 'ig',
        title: 'INSTAGRAM',
        href: 'https://www.instagram.com/vbclabs/',
        visible: true
    },
    {
        iconName: 'promotion_1',
        title: 'promotion_1',
        href: 'https://www.vbc-labs.com/promotion/1',
        visible: false
    }
];
