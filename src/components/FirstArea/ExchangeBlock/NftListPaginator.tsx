import gsap, { Power0 } from 'gsap';
import { CSSProperties, useMemo, useReducer } from 'react';
import { StableNftOption } from 'src/@types/nft';
import { getResources } from 'src/functions/loader';

interface BtnState {
    left: boolean;
    right: boolean;
}

const initBtnState: BtnState = { left: false, right: true };
const reducer = (state: BtnState, action: 'end'|'start'|'middle'): BtnState => {
    switch(action) {
        case 'start':
            return { left: false, right: true };
        case 'middle':
            return { left: true, right: true };
        case 'end':
            return { left: true, right: false };
        default:
            throw new Error();
    }
};

const NftListPaginator = ({
    stableNfts
}: {
    stableNfts: StableNftOption[]
}) => {
    const [btnState, dispatch] = useReducer(reducer, initBtnState);
    const pageTransitionHelper = (direction: 'right'|'left') => {
        if ((btnState.left === false && direction === 'left')
            || (btnState.right === false && direction === 'right')
        ) return;

        const container = document.getElementById('nftListContainer');
        if (container) {
            const width = container.clientWidth;
            const legacyPos = container.scrollLeft;
            gsap.to(container, {
                duration: 0.2,
                scrollTo: {
                    x: `${direction === 'right' ? '+=' : '-='}${width}`
                },
                ease: Power0.easeNone,
                onComplete: () => {
                    const currentPos = container.scrollLeft;
                    if (currentPos === 0) dispatch('start');
                    else if ((currentPos - legacyPos) < width) dispatch('end');
                    else dispatch('middle');
                }
            });
        }
    };
    const arrowRightStyle = useMemo<CSSProperties>(
        () => ({ backgroundImage: `url(${getResources('arrow_right')})` }),
        []
    );

    return stableNfts.length > 2 ? (
        <>
            <div
                className={`arrow-btn right ${btnState.right ? '' : 'disabled'}`}
                style={arrowRightStyle}
                onClick={() => pageTransitionHelper('right')}
            >
            </div>
            <div
                className={`arrow-btn left ${btnState.left ? '' : 'disabled'}`}
                style={arrowRightStyle}
                onClick={() => pageTransitionHelper('left')}
            >
            </div>
        </>
    ) : null;
};

export default NftListPaginator;