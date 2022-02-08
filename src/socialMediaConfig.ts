export type socialIconName = 'twitter'|'opensea'|'discord';

export interface ISocialList {
    iconName: socialIconName,
    title: string,
    visible: boolean
}

export const socialList: ISocialList[] = [
    {
        iconName: 'opensea',
        title: 'OPENSEA',
        visible: false
    },
    {
        iconName: 'opensea',
        title: 'OPENSEA',
        visible: true
    },
    {
        iconName: 'twitter',
        title: 'TWITTER',
        visible: true
    }
];
