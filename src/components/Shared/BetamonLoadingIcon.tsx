import { CSSProperties } from 'react';
import { getResources } from 'src/functions/loader';
import style from './BetamonLoadingIcon.module.scss';

interface LoadingIconParams {
    customStyle?: CSSProperties
}

const BetamonLoadingIcon = ({
    customStyle = {}
}: LoadingIconParams) => (
    <div
        className={style['betamon-loading-icon']}
        style={
            {
                backgroundImage: `url(${getResources('betamon_loading_icon')})`,
                ...customStyle
            }
        }
    >
    </div>
);

export default BetamonLoadingIcon;