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
        href: 'https://twitter.com/VBC_labs',
        visible: true
    }
];

// export interface IKolList {
//     titleLangKey: string,
//     imageLangKey: string,
//     hrefLangKey: string,
//     buttonTextLangKey: string
// };

// export const kolList: IKolList[] = [
//     {
//         titleLangKey: 'KOL_1_TITLE',
//         imageLangKey: 'KOL_1_IMAGE',
//         hrefLangKey: 'KOL_1_HREF',
//         buttonTextLangKey: 'KOL_1'
//     }
// ];