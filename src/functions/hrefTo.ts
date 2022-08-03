import { ISocialList } from 'src/configs/socialMediaConfig';
import gaParser from './gaParser';

const hrefTo = (
    {iconName, href}: Omit<ISocialList, 'title' | 'visible'>
) => {
    gaParser('主站', iconName, '0303版網站');
    window.open(href, '_blank');
};

export default hrefTo;