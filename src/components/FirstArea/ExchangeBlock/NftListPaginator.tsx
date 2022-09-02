import gsap, { Power3 } from 'gsap';
import { CSSProperties, useMemo, useReducer, useState } from 'react';
import { StableNftOption } from 'src/@types/nft';
import { scrollToElementByX } from 'src/animation/scrollToTrigger';
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
    const [paginatorIdx, setPaginatorIdx] = useState(0);
    const pageTransitionHelper = (direction: 'right'|'left') => {
        const additional = direction === 'right' ? 2 : -2;
        let nextTarget = paginatorIdx + additional;
        if (nextTarget >= stableNfts.length - 2) {
            nextTarget = stableNfts.length - 2;
            dispatch('end');
        } else if (nextTarget <= 0) {
            nextTarget = 0;
            dispatch('start');
        } else  dispatch('middle');

        setPaginatorIdx(nextTarget);
        scrollToElementByX(
            '#nftListContainer',
            `#nft${nextTarget}`,
            5
        );
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