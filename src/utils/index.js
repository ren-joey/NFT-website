/* eslint-disable */

/**
 * [AJAX]
 * 伺服器溝通
 */
export { ajax } from './ajax/ajax';
export { eventBucket } from './ajax/eventBucket';
export { ajaxEventBucket } from './ajax/ajaxEventBucket';
export { gtmEventLog } from './ajax/gtmEventLog';

/**
 * [ANIMATION]
 * 動畫
 */
export { requestAnimationFrameByFps } from './animation/requestAnimationFrameByFps';

/**
 * [DATE]
 * 日期操作
 */
export { dateFormat } from './date/dateFormat';
export { dateChecker } from './date/dateChecker';

/**
 * [DEBUG]
 * 除錯用途
 */
export { screenDebug } from './debug/screenDebug';

/**
 * [FILE]
 * 讀取檔案
 */

/**
 * [GSAP]
 * 綠襪相關
 */
export { easeLookUp } from './gsap/easeLookUp';

/**
 * [MATH]
 * 數學運算
 */
export { getUuid } from './math/getUuid';
export { getRandomNumber } from './math/getRandomNumber';
export { getRandomNumberBut } from './math/getRandomNumberBut';
export { getRandomNumberConfig } from './math/getRandomNumberConfig';
export { getRandomOffsetOuter } from './math/getRandomOffsetOuter';
export { roundDecimal } from './math/roundDecimal';
export { shuffle2DArray, shuffle2DArrayWithPos } from './math/shuffle2dArray';
export { sumReduce } from './math/sumReduce';
export { getRandomDice } from './math/getRandomDice';

/**
 * [NODE_ELEMENT]
 * dom 操作
 */
export { brightnessBatch } from './nodeElement/brightnessBatch';
export { clearStyleBatch } from './nodeElement/clearStyleBatch';
export { clearStyleBatchButDisplay } from './nodeElement/clearStyleBatchButDisplay';
export { copyPasteFixed } from './nodeElement/copyPasteFixed';
export { hideBatch } from './nodeElement/hideBatch';
export { offsetFinder } from './nodeElement/offsetFinder';
export { removeBatch } from './nodeElement/removeBatch';
export { windowChecker } from './nodeElement/windowChecker';
export { styleBatch } from './nodeElement/styleBatch';
export { getOuterHeight } from './nodeElement/getOuterHeight';

/**
 * [ANIMATION]]
 * 動畫
 */
export { scrollMover } from './scrollMover/scrollMoveTo'; // scroll animation 滾動動畫

/**
 * [STRING_FORMAT]
 * 字串操作
 */
export { append0Left } from './stringFormat/append0Left';
export { append0Right } from './stringFormat/append0Right';
export { number2String } from './stringFormat/number2String';
export { number2StringShort } from './stringFormat/number2StringShort';
export { number2StringShortA10 } from './stringFormat/number2StringShortA10';
export { splitText2Dom, splitText2DomWithoutSpace } from './stringFormat/splitText2Dom';
export { string2Number } from './stringFormat/string2Number';
export { number2StringNoRoundShort } from './stringFormat/number2StringNoRoundShort';

/**
 * [URL]
 * 網址列操作
 */
export { clearAllParameter } from './url/clearAllParameter';
export { getParameterByName } from './url/getParameterByName';
export { removeParameterByName } from './url/removeParameterByName';

/**
 * [GA]
 * Google Analytics 操作
 */
export { gaInit } from './ga/gaInit';
export { gaSender } from './ga/gaSender';
export { gtmSender } from './ga/gtmSender';
