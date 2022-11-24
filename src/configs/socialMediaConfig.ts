import { SocialIconName } from '../@types/basicVariable';

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
        iconName: 'gallery',
        title: 'GALLERY',
        href: 'https://www.vbc-labs.com/gallery/?id=1&menu=1',
        visible: false
    },
    {
        iconName: 'eth',
        title: 'promotion',
        href: 'https://www.vbc-labs.com/promotion/1',
        visible: false
    },
    {
        iconName: 'eth',
        title: 'promotion',
        href: 'https://www.vbc-labs.com/promotion/2',
        visible: false
    },
    {
        iconName: 'opensea',
        title: 'OPENSEA',
        href: 'https://opensea.io/collection/vbc-dark-betamon',
        visible: false
    },
    {
        iconName: 'skull',
        title: 'vbc-shopfy',
        href: 'https://shop.vbc-labs.com/',
        visible: false
    }
];
